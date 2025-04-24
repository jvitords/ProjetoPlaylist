import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { PlaylistCreateDTO } from '../models/playlistCreateDTO';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = 'http://localhost:8080/playlists'; // URL do backend padronizada

  constructor(private http: HttpClient) {}

  // Listar todas as playlists
  getAll(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  // Criar uma nova playlist
  create(playlist: PlaylistCreateDTO): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiUrl, playlist);
  }

  // Editar uma playlist existente
  update(id: number, playlist: PlaylistCreateDTO): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiUrl}/${id}`, playlist);
  }

  // Excluir uma playlist
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
