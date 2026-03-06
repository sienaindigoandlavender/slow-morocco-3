// ─────────────────────────────────────────────────
// The Tagine Atlas — Regional Variations Mapped
// Module 051 — Culinary Intelligence
// Sources: Field documentation, regional kitchen
// traditions, culinary ethnography
// ─────────────────────────────────────────────────

export interface TagineStyle {
  id: string
  name: string
  nameAr: string
  region: string
  coords: [number, number]
  protein: string
  signature: string
  spices: string[]
  description: string
  color: string
}

export const TAGINE_STYLES: TagineStyle[] = [
  {
    id: 'lamb-prune',
    name: 'Lamb with Prunes & Almonds',
    nameAr: 'طاجين اللحم بالبرقوق',
    region: 'Marrakech',
    coords: [-8.0089, 31.6295],
    protein: 'Lamb shoulder',
    signature: 'Sweet-savory — prunes melt into the sauce, almonds add crunch, cinnamon and honey glaze',
    spices: ['cinnamon', 'saffron', 'ginger', 'honey', 'sesame seeds'],
    description: 'The signature Marrakech tagine. Once reserved for royal courts and special occasions. The dried fruit breaks down into a glossy, caramelized sauce. Toasted almonds and sesame seeds are scattered on top just before serving. The sweetness is never cloying — it\'s balanced by the fat of the lamb and the earthiness of saffron.',
    color: '#F59E0B',
  },
  {
    id: 'chicken-olive',
    name: 'Chicken with Preserved Lemon & Olives',
    nameAr: 'طاجين الدجاج بالحامض والزيتون',
    region: 'Fes',
    coords: [-5.0003, 34.0181],
    protein: 'Chicken (thighs, drumsticks)',
    signature: 'Tangy-briny — preserved lemon and cracked green olives in golden saffron sauce',
    spices: ['saffron', 'turmeric', 'garlic', 'ginger', 'preserved lemon'],
    description: 'Preserved lemon — a distinctly Moroccan ingredient, salt-cured for months — adds a tangy, fermented depth that fresh citrus cannot replicate. Cracked green olives bring brine. The sauce turns gold from saffron and turmeric. Fes claims the most refined version; Casablanca serves it everywhere.',
    color: '#5C7C3E',
  },
  {
    id: 'fish-chermoula',
    name: 'Fish Tagine with Chermoula',
    nameAr: 'طاجين الحوت بالشرمولة',
    region: 'Essaouira / Atlantic Coast',
    coords: [-9.7695, 31.5085],
    protein: 'White fish (monkfish, sea bream), sardines, prawns',
    signature: 'Bright-acidic — chermoula marinade, tomato-pepper sauce, lighter than inland tagines',
    spices: ['cumin', 'paprika', 'cilantro', 'parsley', 'garlic', 'lemon juice'],
    description: 'Along the Atlantic coast, the tagine changes with the tides. Chermoula — a garlicky marinade of cilantro, parsley, cumin, and lemon — replaces the warm spice blends of the interior. The sauce is tomato-based, sharper, brighter. Often served bubbling in shallow clay pots with bread for scooping. The acidity cuts through the oil of the fish.',
    color: '#2D5F8A',
  },
  {
    id: 'kefta',
    name: 'Kefta Mkaouara (Meatball & Egg)',
    nameAr: 'طاجين كفتة مقورة',
    region: 'National — every city',
    coords: [-6.8498, 33.9716],
    protein: 'Ground beef or lamb meatballs',
    signature: 'Spiced tomato sauce, eggs cracked on top, harissa on the side',
    spices: ['cumin', 'paprika', 'cinnamon', 'parsley', 'cilantro'],
    description: 'The democratic tagine — found everywhere, affordable, endlessly variable. Spiced meatballs simmer in a rich tomato sauce until the sauce thickens. Eggs are cracked on top to set gently in the residual heat. Harissa served at the table lets everyone adjust the heat. The definitive comfort food of Morocco.',
    color: '#A0452E',
  },
  {
    id: 'berber',
    name: 'Berber Tagine',
    nameAr: 'طاجين أمازيغي',
    region: 'High Atlas Mountains',
    coords: [-7.9153, 31.0500],
    protein: 'Lamb, goat, or chicken (depends on family livestock)',
    signature: 'Stripped-down — fewer ingredients, longer cook, clean flavors. No sugar, no dried fruit.',
    spices: ['cumin', 'coriander', 'preserved lemon', 'olive oil', 'garlic'],
    description: 'Starts with onions, preserved lemon, and olive oil. Carrots, potatoes, beans do the heavy lifting. The long cook draws depth from modest ingredients. Built for cold nights at 1,800 meters. The charred bottom of a well-used clay tagine — scraped onto the last mouthfuls of Berber bread — is the best part.',
    color: '#78716C',
  },
  {
    id: 'mrouzia',
    name: 'Mrouzia (Festival Lamb)',
    nameAr: 'المروزية',
    region: 'National — Eid al-Adha',
    coords: [-6.3498, 32.3216],
    protein: 'Lamb (mutton)',
    signature: 'Sweet-rich — honey, raisins, almonds, ras el hanout. The Eid celebration dish.',
    spices: ['ras el hanout', 'cinnamon', 'nutmeg', 'honey', 'raisins'],
    description: 'Associated with Eid al-Adha, when every family prepares lamb. Mrouzia is the most spiced tagine — ras el hanout (the "head of the shop" blend of 20–30 spices) is the engine. Honey, raisins, and almonds create a sweetness that borders on confectionery. Prepared for generations during the Feast of Sacrifice.',
    color: '#7B506F',
  },
  {
    id: 'tangia',
    name: 'Tangia Marrakchia',
    nameAr: 'طنجية مراكشية',
    region: 'Marrakech (exclusively)',
    coords: [-7.9811, 31.6340],
    protein: 'Beef or lamb',
    signature: 'Not a tagine pot — an amphora-shaped clay urn, slow-cooked in hammam embers all day',
    spices: ['preserved lemon', 'garlic', 'cumin', 'saffron', 'smen (aged butter)'],
    description: 'Technically not a tagine but its closest cousin. Named after the tall clay urn (tangia), not cooked over fire but buried in the embers of a public bathhouse furnace. Traditionally a bachelor\'s dish — men would seal meat, spices, preserved lemon, and smen (aged butter) in the urn and leave it at the hammam to slow-cook all day. Fall-off-the-bone tender with a deep, smoky flavor unique to Marrakech.',
    color: '#C17F28',
  },
  {
    id: 'vegetable',
    name: 'Seven-Vegetable Tagine',
    nameAr: 'طاجين الخضر',
    region: 'National — home cooking',
    coords: [-7.6114, 33.5731],
    protein: 'Chickpeas (no meat)',
    signature: 'Hearty, budget-friendly — seasonal vegetables, chickpeas, ras el hanout, saffron',
    spices: ['ras el hanout', 'saffron', 'turmeric', 'cumin', 'paprika'],
    description: 'Potatoes, carrots, squash, turnips, courgettes, chickpeas, and whatever else the season provides. The vegetables soften slowly, the chickpeas thicken the broth, and the spices bring warmth without overpowering. The most common weeknight tagine across Morocco. Dried apricots or figs sometimes appear for sweetness.',
    color: '#5C7C3E',
  },
  {
    id: 'sardine',
    name: 'Sardine Tagine',
    nameAr: 'طاجين السردين',
    region: 'Safi / Atlantic Coast',
    coords: [-9.2372, 32.2994],
    protein: 'Fresh sardines',
    signature: 'Layered sardines over chermoula-spiced tomatoes and peppers. Simple, fast, coastal.',
    spices: ['chermoula', 'cumin', 'paprika', 'tomato', 'bell peppers'],
    description: 'Morocco is the world\'s largest exporter of sardines, and Safi is the sardine capital. Fresh sardines are layered over a bed of tomatoes, peppers, and onions spiked with chermoula. Cooked faster than any meat tagine — 20 to 30 minutes. A fisherman\'s lunch, eaten with bread and nothing else.',
    color: '#06B6D4',
  },
  {
    id: 'rif-olive',
    name: 'Rif Chicken with Olives & Thyme',
    nameAr: 'طاجين الدجاج الريفي',
    region: 'Rif Mountains / Northern Morocco',
    coords: [-4.7500, 35.1667],
    protein: 'Chicken',
    signature: 'Northern style — heavy on olives, citrus, wild thyme. Lighter spicing than Marrakech.',
    spices: ['thyme', 'olives', 'garlic', 'olive oil', 'preserved lemon'],
    description: 'The Rif version reflects its Mediterranean proximity. More olives, more citrus, more herbs. Wild thyme (zaatar) from the mountains replaces the heavy spice blends of the south. The olive oil is local and abundant. Lighter and cleaner than Marrakech tagines — the food of a greener, cooler Morocco.',
    color: '#059669',
  },
]

export interface SpicePantry {
  name: string
  nameAr: string
  role: string
  note: string
}

export const SPICE_PANTRY: SpicePantry[] = [
  { name: 'Ras el Hanout', nameAr: 'رأس الحانوت', role: 'Master blend', note: '"Head of the shop." 20–30 spices — no fixed recipe. Each spice merchant\'s reputation rests on their blend. Cinnamon, cardamom, nutmeg, clove, turmeric, peppercorns, and often rosebuds.' },
  { name: 'Saffron', nameAr: 'الزعفران', role: 'Color, depth', note: 'Grown in Taliouine (Anti-Atlas). Morocco is the 4th largest producer. Crushed threads soaked in warm water, added for golden color and floral earthiness.' },
  { name: 'Preserved Lemon', nameAr: 'الحامض المرقد', role: 'Tangy salt', note: 'Lemons salt-cured for months. The rind softens, the juice intensifies. A distinctly Moroccan ingredient — adds depth that fresh citrus cannot.' },
  { name: 'Cumin', nameAr: 'الكمون', role: 'Foundation', note: 'Present in almost every tagine. Earthy and warm.' },
  { name: 'Ginger', nameAr: 'سكنجبير', role: 'Warmth', note: 'Ground ginger is a constant in Moroccan spice blends. Adds a quiet, persistent warmth without the heat of chili.' },
  { name: 'Cinnamon', nameAr: 'القرفة', role: 'Sweet warmth', note: 'Used in sweet-savory dishes. The bridge between meat and fruit in Marrakech-style tagines. Ceylon cinnamon preferred.' },
  { name: 'Chermoula', nameAr: 'الشرمولة', role: 'Marinade', note: 'Not a single spice but a paste: cilantro, parsley, garlic, cumin, paprika, lemon juice, olive oil. The soul of every coastal fish tagine.' },
  { name: 'Smen', nameAr: 'السمن', role: 'Aged butter', note: 'Clarified butter aged in clay jars for months or years. Sharp, pungent, funky. Adds a depth to tagines that fresh butter cannot approach. Essential in tangia.' },
]

export interface VesselFact {
  label: string
  detail: string
}

export const VESSEL: VesselFact[] = [
  { label: 'Origin', detail: 'Berber invention, Anti-Atlas Mountains. Over 1,000 years old. The word "tagine" refers to both the pot and the dish.' },
  { label: 'Design', detail: 'Circular flat base + cone-shaped lid. The cone traps steam, returns condensation to the dish. Self-basting, water-conserving — critical in arid regions.' },
  { label: 'Material', detail: 'Unglazed earthenware (traditional) or glazed ceramic (modern). Clay absorbs flavors over years of use — a seasoned tagine has memory.' },
  { label: 'Heat', detail: 'Traditionally cooked over charcoal braziers (majmar/kanoun). Large charcoal bricks stay hot for hours. Never direct high heat — the clay cracks.' },
  { label: 'Communal', detail: 'The tagine is placed in the center of the table. Everyone eats from the pot with bread. No individual plates. The dish is social architecture.' },
  { label: 'Seasoning', detail: 'New clay tagines must be soaked in water for hours before first use. A heat diffuser is essential on modern stoves. The pot breaks in slowly.' },
]

export interface CulturalRule {
  rule: string
  explanation: string
}

export const CULTURAL_RULES: CulturalRule[] = [
  { rule: 'Eat from your side', explanation: 'Each person eats from the section of the tagine directly in front of them. Reaching across is impolite. The host pushes the best pieces toward guests.' },
  { rule: 'Bread is the utensil', explanation: 'Tear khobz (round bread) with the right hand. Use it to pinch meat and scoop sauce. Forks exist but are optional. The bread is baked daily in communal ovens.' },
  { rule: 'Tagine is not couscous', explanation: 'Tagine and couscous are separate dishes, not complementary. Serving tagine over couscous is a tourist adaptation. Couscous is traditionally served on Fridays.' },
  { rule: 'Slow is non-negotiable', explanation: 'A proper tagine simmers for 1.5–3 hours. The charred bottom (the "fond") is prized, not discarded. Rushed tagines score dramatically lower in flavor complexity.' },
  { rule: 'The lid stays on', explanation: 'Opening the lid releases steam and disrupts the self-basting cycle. The cook checks by lifting the lid briefly, never removing it. Patience is a skill.' },
  { rule: 'Guest gets the best cut', explanation: 'The host serves guests first, pushing tender meat and the best pieces toward them. Refusing food is culturally awkward. Accept, eat, praise.' },
]

export const HERO_STATS = [
  { value: '10', label: 'Regional styles mapped' },
  { value: '1,000+', label: 'Years of tradition' },
  { value: '8', label: 'Essential spices' },
  { value: '3 hrs', label: 'Slow-cook minimum' },
]
