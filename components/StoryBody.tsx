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

export default function StoryBody({ content }: StoryBodyProps) {
  if (!content) return null;

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
            className="text-foreground/70 leading-relaxed mb-6"
          >
            {processText(paragraph)}
          </p>
        );
      })}
    </div>
  );
}
