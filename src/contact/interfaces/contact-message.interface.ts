import {
  ContactMessageStatus,
  ISODateString,
  Nullable,
  UUID,
} from '../../common/types/database.types';

export interface ContactMessage {
  id: UUID;
  name: string;
  email: string;
  subject: string;
  message: string;
  portfolioSlug: Nullable<string>;
  status: ContactMessageStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ContactMessageRow {
  id: UUID;
  name: string;
  email: string;
  subject: string;
  message: string;
  portfolio_slug: Nullable<string>;
  status: ContactMessageStatus;
  created_at: ISODateString;
  updated_at: ISODateString;
}
