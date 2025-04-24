import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
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
  mostrarConfirmacao = false;
  playlistIdParaExcluir: number | null = null;
  mostrarMusicas: number | null = null;

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

  // Função para buscar playlists por nome
  buscarPorNome(): void {
    if (this.filtroNome.trim()) {
      this.playlistService.getByName(this.filtroNome).subscribe((playlists) => {
        this.playlists = playlists;
      });
    } else {
      this.loadPlaylists(); // Se estiver vazio, volta a lista completa
    }
  }

  // Função para abrir o modal de adicionar ou editar playlist
  abrirModal(): void {
    this.form.reset();
    this.mostrarModal = true;
    this.editingId = null;
  }

  // Função para fechar o modal
  fecharModal(): void {
    this.mostrarModal = false;
  }

  // Função para submeter o formulário de criar ou editar playlist
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

  // Função para editar uma playlist
  editPlaylist(playlist: Playlist): void {
    this.editingId = playlist.id;
    this.form.setValue({
      name: playlist.name,
      genre: playlist.genre,
    });
    this.mostrarModal = true;
  }

  // Função para iniciar a confirmação de exclusão
  confirmDelete(playlistId: number): void {
    this.playlistIdParaExcluir = playlistId;
    this.mostrarConfirmacao = true;
  }

  // Função para executar a exclusão após confirmação
  confirmarExclusao(): void {
    if (this.playlistIdParaExcluir !== null) {
      this.playlistService.delete(this.playlistIdParaExcluir).subscribe(() => {
        this.loadPlaylists();
        this.mostrarConfirmacao = false;
        this.playlistIdParaExcluir = null;
      });
    }
  }

  // Função para cancelar a exclusão
  cancelarExclusao(): void {
    this.mostrarConfirmacao = false;
    this.playlistIdParaExcluir = null;
  }

  // Função para carregar as playlists
  loadPlaylists(): void {
    this.playlistService.getAll().subscribe((listPlaylistBack) => {
      this.playlists = listPlaylistBack;
    });
  }

  // Função para alternar a exibição das músicas
  toggleMusicas(playlistId: number): void {
    this.mostrarMusicas =
      this.mostrarMusicas === playlistId ? null : playlistId;
  }
}
