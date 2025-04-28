import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MusicService } from '../services/music.service';
import { Music } from '../models/music.model';
import { MusicCreateDTO } from '../models/musicCreateDTO';

@Component({
  selector: 'app-music-comp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './music-comp.component.html',
  styleUrls: ['./music-comp.component.css'],
})
export class MusicCompComponent implements OnInit {
  form: FormGroup;
  musics: Music[] = [];
  editingId: number | null = null;
  mostrarModal = false;
  filtroNome: string = '';
  modoExclusao: boolean = false;

  constructor(private fb: FormBuilder, private musicService: MusicService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      artist: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMusics();
  }

  // Função para carregar todas as músicas
  loadMusics(): void {
    this.musicService.getAll().subscribe((musics) => {
      this.musics = musics;
    });
  }

  // Função para buscar músicas por nome
  buscarPorNome(): void {
    if (this.filtroNome.trim()) {
      this.musicService.getByName(this.filtroNome).subscribe((musics) => {
        this.musics = musics;
      });
    } else {
      this.loadMusics();
    }
  }

  // Função para abrir o modal de criação e edição
  abrirModal(): void {
    this.form.reset();
    this.mostrarModal = true;
    this.editingId = null;
    this.modoExclusao = false;
  }

  // Função para fechar o modal
  fecharModal(): void {
    this.mostrarModal = false;
  }

  // Função para mostrar o formulário de criação ou edição
  submitForm(): void {
    if (this.modoExclusao && this.editingId) {
      this.musicService.delete(this.editingId).subscribe(() => {
        this.loadMusics();
        this.fecharModal();
      });
      return;
    }

    if (this.form.valid) {
      const novaMusic: MusicCreateDTO = this.form.value;

      if (this.editingId) {
        const musicAtualizada: Music = {
          id: this.editingId,
          ...novaMusic,
        };

        this.musicService.update(this.editingId, musicAtualizada).subscribe({
          next: () => {
            this.loadMusics();
            this.fecharModal();
            this.editingId = null;
          },
          error: (err) => {
            console.error('Erro ao atualizar música:', err);
            alert('Erro ao atualizar música!');
          },
        });
      } else {
        this.musicService.create(novaMusic).subscribe({
          next: () => {
            this.loadMusics();
            this.fecharModal();
          },
          error: (err) => {
            console.error('Erro ao criar música:', err);
            alert('Erro ao criar música!');
          },
        });
      }
    }
  }

  // Função para editar uma música
  editMusic(music: Music): void {
    this.form.setValue({
      name: music.name,
      artist: music.artist,
    });
    this.editingId = music.id;
    this.modoExclusao = false;
    this.mostrarModal = true;
  }

  // Função para excluir uma música
  confirmDelete(musicId: number): void {
    if (confirm('Tem certeza que deseja excluir esta música?')) {
      this.musicService.delete(musicId).subscribe(() => {
        this.loadMusics(); // Atualiza a lista após a exclusão
      });
    }
  }

  abrirConfirmacaoExclusao(music: Music): void {
    this.editingId = music.id;
    this.form.setValue({
      name: music.name,
      artist: music.artist,
    });
    this.modoExclusao = true;
    this.mostrarModal = true;
  }
}
