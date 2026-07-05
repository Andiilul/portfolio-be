import {
  ContactMessage,
  ContactMessageRow,
} from './interfaces/contact-message.interface';

export const mapContactMessageRow = (
  row: ContactMessageRow,
): ContactMessage => ({
  id: row.id,
  name: row.name,
  email: row.email,
  subject: row.subject,
  message: row.message,
  portfolioSlug: row.portfolio_slug,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});
