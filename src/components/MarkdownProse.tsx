import ReactMarkdown from 'react-markdown';

export function MarkdownProse({ markdown }: { markdown: string }) {
  return <div className="markdown-prose"><ReactMarkdown>{markdown}</ReactMarkdown></div>;
}
