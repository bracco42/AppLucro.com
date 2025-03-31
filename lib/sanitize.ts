import DOMPurify from 'dompurify';

export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target'], // Garante que o target="_blank" seja mantido
    ADD_TAGS: ['iframe'] // Se precisar de iframes no futuro
  });
}
