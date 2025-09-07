export interface IFooter {
  id: number;
  documentId: string;
  contacting: Contacting;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Contacting {
  phone: string;
  mail: string;
  cc_message: string;
}
