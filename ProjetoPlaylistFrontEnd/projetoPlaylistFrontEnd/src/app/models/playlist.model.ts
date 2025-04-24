import { Music } from './music.model'; // Corrigido de music.models para music.model

export interface Playlist {
  id: number;
  name: string;
  genre: string;
  quantityMusic: number;
  listMusics: Music[];
}
