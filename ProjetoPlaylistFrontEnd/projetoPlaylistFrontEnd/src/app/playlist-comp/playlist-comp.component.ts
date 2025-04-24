import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../models/playlist.model';
import { PlaylistCreateDTO } from '../models/playlistCreateDTO';

@Component({
  selector: 'app-playlist-comp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './playlist-comp.component.html',
  styleUrls: ['./playlist-comp.component.css'],
})
export class PlaylistCompComponent implements OnInit {
  form: FormGroup;
  playlists: Playlist[] = [];
  editingId: number | null = null;
  mostrarModal = false;
  filtroNome: string = '';

  // Novos campos para confirmação de exclusão
  mostrarConfirmacao = false;
  playlistIdParaExcluir: number | null = null;

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

  buscarPorNome(): void {
    if (this.filtroNome.trim()) {
      this.playlistService.getByName(this.filtroNome).subscribe((playlists) => {
        this.playlists = playlists;
      });
    } else {
      this.loadPlaylists(); // Se estiver vazio, volta a lista completa
    }
  }

  abrirModal(): void {
    this.form.reset();
    this.mostrarModal = true;
    this.editingId = null;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  submitForm(): void {
    if (this.form.valid) {
      const novaPlaylist: PlaylistCreateDTO = this.form.value;

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
      } else {
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

  editPlaylist(playlist: Playlist): void {
    this.editingId = playlist.id;
    this.form.setValue({
      name: playlist.name,
      genre: playlist.genre,
    });
    this.mostrarModal = true;
  }

  // Inicia o processo de confirmação
  confirmDelete(playlistId: number): void {
    this.playlistIdParaExcluir = playlistId;
    this.mostrarConfirmacao = true;
  }

  // Executa a exclusão após confirmação
  confirmarExclusao(): void {
    if (this.playlistIdParaExcluir !== null) {
      this.playlistService.delete(this.playlistIdParaExcluir).subscribe(() => {
        this.loadPlaylists();
        this.mostrarConfirmacao = false;
        this.playlistIdParaExcluir = null;
      });
    }
  }

  // Cancela a exclusão
  cancelarExclusao(): void {
    this.mostrarConfirmacao = false;
    this.playlistIdParaExcluir = null;
  }

  loadPlaylists(): void {
    this.playlistService.getAll().subscribe((listPlaylistBack) => {
      this.playlists = listPlaylistBack;
    });
  }
}
