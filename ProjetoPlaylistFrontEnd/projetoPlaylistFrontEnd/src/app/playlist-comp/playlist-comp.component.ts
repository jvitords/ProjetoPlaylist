import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../models/playlist.model';
import { PlaylistCreateDTO } from '../models/playlistCreateDTO';

@Component({
  selector: 'app-playlist-comp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './playlist-comp.component.html',
  styleUrls: ['./playlist-comp.component.css'],
})
export class PlaylistCompComponent implements OnInit {
  form: FormGroup;
  playlists: Playlist[] = [];
  editingId: number | null = null;
  mostrarModal = false;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPlaylists();
  }

  // Abrir o modal para adicionar ou editar playlist
  abrirModal(): void {
    this.form.reset();
    this.mostrarModal = true;
    this.editingId = null; // Limpa o estado de edição
  }

  // Fechar o modal
  fecharModal(): void {
    this.mostrarModal = false;
  }

  // Submeter o formulário para criar ou editar uma playlist
  submitForm(): void {
    if (this.form.valid) {
      const novaPlaylist: PlaylistCreateDTO = this.form.value;

      // Se estiver editando
      if (this.editingId) {
        this.playlistService.update(this.editingId, novaPlaylist).subscribe({
          next: () => {
            this.loadPlaylists();
            this.fecharModal();
          },
          error: (erro) => {
            console.error('Erro ao atualizar playlist:', erro);
            alert('Erro ao atualizar playlist');
          },
        });
      }
      // Se estiver criando uma nova playlist
      else {
        this.playlistService.create(novaPlaylist).subscribe({
          next: () => {
            this.loadPlaylists();
            this.fecharModal();
          },
          error: (erro) => {
            console.error('Erro ao criar playlist:', erro);
            alert('Erro ao criar playlist');
          },
        });
      }
    }
  }

  // Editar uma playlist existente
  editPlaylist(playlist: Playlist): void {
    this.editingId = playlist.id;
    this.form.setValue({
      name: playlist.name,
      genre: playlist.genre,
    });
    this.mostrarModal = true;
  }

  // Deletar uma playlist por id
  delete(id: number): void {
    this.playlistService.delete(id).subscribe(() => {
      this.loadPlaylists();
    });
  }

  // Confirmar a exclusão de uma playlist
  confirmDelete(playlistId: number): void {
    const confirmed = confirm('Tem certeza que deseja excluir esta playlist?');
    if (confirmed) {
      this.delete(playlistId);
    }
  }

  // Carregar todas as playlists
  loadPlaylists(): void {
    this.playlistService.getAll().subscribe((listPlaylistBack) => {
      this.playlists = listPlaylistBack;
    });
  }
}
