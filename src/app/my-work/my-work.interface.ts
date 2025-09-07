import { Picture } from '../common.interface';

export interface IProject {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  url: string;
  description: string;
  picture: Picture;
}
