'use client';

import React from 'react';
import { linkGlossaryTermsText } from '@/lib/glossary-linker';
import { linkDerbTermsText } from '@/lib/derb-linker';

interface StoryBodyProps {
  content: string;
}

// Combined linker: first applies derb.so links, then glossary links to remaining text
function linkAllTerms(text: string): React.ReactNode {
  const derbResult = linkDerbTermsText(text);
  
  if (typeof derbResult === 'string') {
    return linkGlossaryTermsText(derbResult);
  }
  
  if (!derbResult || !React.isValidElement(derbResult)) {
    return linkGlossaryTermsText(text);
  }

  const children = React.Children.toArray((derbResult as React.ReactElement).props.children);
  return (
    <>
      {children.map((child, i) => {
        if (typeof child === 'string') {
          return <React.Fragment key={i}>{linkGlossaryTermsText(child)}</React.Fragment>;
        }
        return child;
      })}
    </>
  );
}

// Process text: extract URLs FIRST, then run linkers only on non-URL text
function processText(text: string): React.ReactNode {
  const parts = text.split(/(https?:\/\/[^\s,)]+)/g);
  
  if (parts.length === 1) {
    return linkAllTerms(text);
  }

  return (
    <>
      {parts.map((part, i) => {
        if (part.match(/^https?:\/\//)) {
          return (
            <a
              key={`url-${i}`}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground/90 transition-colors"
            >
              {part.replace('https://www.', '').replace('https://', '')}
            </a>
          );
        }
        if (part.trim()) {
          return <React.Fragment key={`txt-${i}`}>{linkAllTerms(part)}</React.Fragment>;
        }
        return <React.Fragment key={`emp-${i}`}>{part}</React.Fragment>;
      })}
    </>
  );
}

// Detect if content contains HTML tags
function isHTML(str: string): boolean {
  return /<[a-z][^>]*>/i.test(str);
}

// Sanitize and normalise HTML for safe rendering
// Adds consistent Tailwind classes to known tags
function prepareHTML(html: string): string {
  return html
    // Paragraphs
    .replace(/<p>/gi, '<p class="text-foreground/70 leading-relaxed mb-6">')
    // Headings
    .replace(/<h1>/gi, '<h1 class="font-serif text-3xl text-foreground mt-12 mb-6">')
    .replace(/<h2>/gi, '<h2 class="font-serif text-2xl text-foreground mt-12 mb-6">')
    .replace(/<h3>/gi, '<h3 class="font-serif text-xl text-foreground mt-10 mb-4">')
    .replace(/<h4>/gi, '<h4 class="font-serif text-lg text-foreground mt-8 mb-3">')
    .replace(/<h5>/gi, '<h5 class="text-sm font-medium tracking-wider uppercase text-foreground/60 mt-6 mb-2">')
    // Links
    .replace(
      /<a\s+href="([^"]+)"[^>]*>/gi,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 text-foreground hover:text-foreground/60 transition-colors">'
    )
    // Lists
    .replace(/<ul>/gi, '<ul class="list-none space-y-2 mb-6 pl-0">')
    .replace(/<ol>/gi, '<ol class="list-decimal pl-6 space-y-2 mb-6">')
    .replace(/<li>/gi, '<li class="text-foreground/70 leading-relaxed">')
    // Blockquote
    .replace(/<blockquote>/gi, '<blockquote class="border-l-2 border-foreground/20 pl-6 my-8 text-xl italic text-foreground/70">')
    // Strong / em
    .replace(/<strong>/gi, '<strong class="font-medium text-foreground">')
    .replace(/<em>/gi, '<em class="italic">');
}

export default function StoryBody({ content }: StoryBodyProps) {
  if (!content) return null;

  // HTML content — render directly with styled tags
  if (isHTML(content)) {
    return (
      <div
        className="prose prose-lg max-w-none story-html-body"
        dangerouslySetInnerHTML={{ __html: prepareHTML(content) }}
      />
    );
  }

  // Markdown/plain text — existing paragraph renderer
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="prose prose-lg max-w-none">
      {paragraphs.map((paragraph, index) => {
        if (paragraph.trim().startsWith('>')) {
          const quoteText = paragraph.trim().replace(/^>\s*/, '');
          return (
            <blockquote
              key={index}
              className="border-l-2 border-foreground/20 pl-6 my-8 text-xl italic text-foreground/70"
            >
              {processText(quoteText)}
            </blockquote>
          );
        }

        if (paragraph.trim().startsWith('## ')) {
          const headingText = paragraph.trim().replace(/^##\s*/, '');
          return (
            <h2
              key={index}
              className="font-serif text-2xl text-foreground mt-12 mb-6"
            >
              {headingText}
            </h2>
          );
        }

        return (
          <p
            key={index}
            className="text-foreground leading-relaxed mb-6"
          >
            {processText(paragraph)}
          </p>
        );
      })}
    </div>
  );
}
