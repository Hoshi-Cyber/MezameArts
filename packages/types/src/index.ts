export interface Artwork {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  artistId: string;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  country: string;
  bio?: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
}
