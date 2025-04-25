import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../models/playlist.model';
import { PlaylistCreateDTO } from '../models/playlistCreateDTO';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-playlist-comp',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
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
  playlistSelecionada: number | null = null;
  musicasDisponiveis: any[] = [];
  mostrarConfirmacaoMusica = false;
  musicaIdParaExcluir: number | null = null;
  musicaAdicionadaComSucesso = false;
  playlistIdParaRemoverMusica: number | null = null;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private musicService: MusicService
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

  // Função para abrir a seleção de músicas para uma playlist
  abrirSelecaoMusicas(idPlaylist: number): void {
    this.playlistSelecionada = idPlaylist;
    this.carregarMusicasDisponiveis(); // Carrega as músicas disponíveis
  }

  // Função para fechar o modal de seleção de músicas
  fecharSelecaoMusicas(): void {
    this.playlistSelecionada = null;
  }

  // Função para carregar todas as músicas disponíveis
  carregarMusicasDisponiveis(): void {
    this.musicService.getAll().subscribe((data) => {
      this.musicasDisponiveis = data;
    });
  }

  // Função para adicionar uma música à playlist selecionada
  adicionarMusica(idPlaylist: number, idMusic: number): void {
    this.playlistService
      .adicionarMusicaNaPlaylist(idPlaylist, idMusic)
      .subscribe(() => {
        this.musicaAdicionadaComSucesso = true;
        setTimeout(() => {
          this.musicaAdicionadaComSucesso = false;
        }, 3000);
        this.atualizarPlaylist(idPlaylist);
      });
  }

  // Função para remover música de uma playlist
  confirmDeleteMusica(idPlaylist: number, idMusic: number): void {
    this.playlistIdParaRemoverMusica = idPlaylist;
    this.musicaIdParaExcluir = idMusic;
    this.mostrarConfirmacaoMusica = true;
  }

  // Função para confirmar a exclusão de uma música
  confirmarExclusaoMusica(): void {
    if (
      this.musicaIdParaExcluir !== null &&
      this.playlistIdParaRemoverMusica !== null
    ) {
      this.playlistService
        .removerMusicaDaPlaylist(
          this.playlistIdParaRemoverMusica,
          this.musicaIdParaExcluir
        )
        .subscribe(() => {
          this.mostrarConfirmacaoMusica = false;
          this.musicaIdParaExcluir = null;
          this.atualizarPlaylist(this.playlistIdParaRemoverMusica!);
          this.playlistIdParaRemoverMusica = null;
        });
    }
  }

  // Função para cancelar a exclusão de música
  cancelarExclusaoMusica(): void {
    this.mostrarConfirmacaoMusica = false;
    this.musicaIdParaExcluir = null;
    this.playlistIdParaRemoverMusica = null;
  }

  // Função para atualizar a playlist após adicionar ou remover músicas
  atualizarPlaylist(idPlaylist: number): void {
    this.playlistService.getById(idPlaylist).subscribe((playlistAtualizada) => {
      const index = this.playlists.findIndex((p) => p.id === idPlaylist);
      if (index !== -1) {
        // Substitui o objeto inteiro, disparando detecção de mudança
        this.playlists[index] = { ...playlistAtualizada };
      }
    });
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

  // Exibe a mensagem de sucesso
  mostrarMensagemSucesso() {
    this.musicaAdicionadaComSucesso = true;
    setTimeout(() => {
      this.musicaAdicionadaComSucesso = false;
    }, 3000);
  }
}
