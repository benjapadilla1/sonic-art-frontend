export interface Comment {
  id?: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Chapter {
  id?: string;
  title: string;
  description: string;
  comments?: Comment[];
  videoUrl?: string | null;
  order: number;
}

export interface Module {
  id?: string;
  title: string;
  description: string;
  order: number;
  chapters: Chapter[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  category?: string;
  coverImageUrl?: string;
  modules: Module[];
  createdAt: string;
  updatedAt?: string;
}

export interface SamplePack {
  id?: string;
  title: string;
  description: string;
  coverImageUrl: string;
  downloadUrl: string;
  previewTracks: string[];
  price: number;
  category?: string;
  createdAt: string;
  updatedAt?: string;
}
