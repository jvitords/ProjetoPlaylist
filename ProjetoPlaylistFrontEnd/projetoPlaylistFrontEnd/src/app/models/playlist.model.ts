import { Music } from './music.model';

export interface Playlist {
  id: number;
  name: string;
  genre: string;
  quantityMusic: number;
  listMusics: Music[];
}
