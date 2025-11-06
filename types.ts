export interface ArtItem {
  id: number;
  title: string;
  artist: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
}

export interface CartItem extends ArtItem {
  quantity: number;
}

export type Page = 'splash' | 'home' | 'gallery' | 'cart';