import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from '../models/music.model';
import { MusicCreateDTO } from '../models/musicCreateDTO';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private apiUrl = 'http://localhost:8080/music'; // Ajuste para o seu backend

  constructor(private http: HttpClient) {}

  // Obter todas as músicas
  getAll(): Observable<Music[]> {
    return this.http.get<Music[]>(this.apiUrl);
  }

  // Obter música por nome (busca)
  getByName(name: string): Observable<Music[]> {
    return this.http.get<Music[]>(`${this.apiUrl}?name=${name}`);
  }

  // Obter música por ID
  getById(id: number): Observable<Music> {
    return this.http.get<Music>(`${this.apiUrl}/${id}`);
  }

  // Criar nova música
  create(music: MusicCreateDTO): Observable<Music> {
    return this.http.post<Music>(this.apiUrl, music);
  }

  // Atualizar música
  update(id: number, music: MusicCreateDTO): Observable<Music> {
    return this.http.put<Music>(`${this.apiUrl}/${id}`, music);
  }

  // Excluir música
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
