import DOMPurify from 'dompurify';

export function sanitizeHTML(html: string): string {
  // Sanitização básica universal (remove tags HTML)
  const sanitized = html.replace(/<[^>]*>?/gm, '');
  return sanitized + '!!!';
}
