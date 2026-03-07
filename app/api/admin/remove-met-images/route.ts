import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// One-time endpoint to remove Metropolitan Museum images from the-harem-geometry
// DELETE /api/admin/remove-met-images
export async function DELETE() {
  // Fetch all images for this story
  const { data: images, error: fetchError } = await supabase
    .from("story_images")
    .select("id, image_url, caption, attribution, source_url")
    .eq("story_slug", "the-harem-geometry");

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  // Identify Met images by URL or attribution
  const metImages = (images || []).filter((img) => {
    const url = (img.image_url || "").toLowerCase();
    const attr = (img.attribution || "").toLowerCase();
    const source = (img.source_url || "").toLowerCase();
    const caption = (img.caption || "").toLowerCase();
    return (
      url.includes("metmuseum") ||
      attr.includes("metropolitan") ||
      attr.includes("the met") ||
      source.includes("metmuseum") ||
      caption.includes("metropolitan")
    );
  });

  if (metImages.length === 0) {
    return NextResponse.json({
      message: "No Met images found",
      totalImages: images?.length || 0,
      allImages: images,
    });
  }

  // Delete them
  const idsToDelete = metImages.map((img) => img.id);
  const { error: deleteError } = await supabase
    .from("story_images")
    .delete()
    .in("id", idsToDelete);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: `Removed ${metImages.length} Met images`,
    removed: metImages,
    remaining: (images?.length || 0) - metImages.length,
  });
}

// GET to preview what would be removed
export async function GET() {
  const { data: images, error } = await supabase
    .from("story_images")
    .select("id, image_url, caption, attribution, source_url, position")
    .eq("story_slug", "the-harem-geometry")
    .order("position", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const metImages = (images || []).filter((img) => {
    const url = (img.image_url || "").toLowerCase();
    const attr = (img.attribution || "").toLowerCase();
    const source = (img.source_url || "").toLowerCase();
    const caption = (img.caption || "").toLowerCase();
    return (
      url.includes("metmuseum") ||
      attr.includes("metropolitan") ||
      attr.includes("the met") ||
      source.includes("metmuseum") ||
      caption.includes("metropolitan")
    );
  });

  return NextResponse.json({
    total: images?.length || 0,
    metCount: metImages.length,
    metImages,
    allImages: images,
  });
}
