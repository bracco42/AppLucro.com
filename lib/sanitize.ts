import DOMPurify from 'dompurify';

// Cria uma instância segura para SSR
let purify: typeof DOMPurify.sanitize;

if (typeof window === 'undefined') {
  // No servidor (SSR), retorna o HTML sem sanitização (ou com sanitização básica)
  purify = (html: string) => html;
} else {
  // No cliente, usa DOMPurify normalmente
  purify = DOMPurify.sanitize;
}

export function sanitizeHTML(html: string): string {
  return purify(html) + '!!!';
}
