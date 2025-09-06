import { Picture } from '../common.interface';

export interface TitleBan {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  profile_picture: Picture;
}
