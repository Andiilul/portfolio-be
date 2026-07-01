export type UUID = string;
export type ISODateString = string;
export type Nullable<T> = T | null;

export type PortfolioStatus = 'draft' | 'published' | 'archived';
export type ProjectStatus = 'draft' | 'published' | 'archived';
export type LinkType =
  | 'github'
  | 'linkedin'
  | 'instagram'
  | 'website'
  | 'email'
  | 'phone'
  | 'other';
