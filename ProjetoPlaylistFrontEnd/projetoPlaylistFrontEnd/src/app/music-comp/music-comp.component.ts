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
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // Certifique-se de importar ReactiveFormsModule aqui
  templateUrl: './music-comp.component.html',
  styleUrls: ['./music-comp.component.css'],
})
export class MusicCompComponent implements OnInit {
  form: FormGroup;
  musics: Music[] = [];
  editingId: number | null = null;
  mostrarModal = false;
  filtroNome: string = '';

  constructor(private fb: FormBuilder, private musicService: MusicService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      artist: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMusics(); // Carregar músicas ao iniciar o componente
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
      this.loadMusics(); // Se o campo estiver vazio, retorna todas as músicas
    }
  }

  // Função para abrir o modal de criação/edição
  abrirModal(): void {
    this.form.reset();
    this.mostrarModal = true;
    this.editingId = null; // Limpa o campo de edição
  }

  // Função para fechar o modal
  fecharModal(): void {
    this.mostrarModal = false;
  }

  // Função para submeter o formulário de criação ou edição
  submitForm(): void {
    console.log('Formulário enviado:', this.form.value);
    console.log('É válido?', this.form.valid);

    if (this.form.valid) {
      const novaMusic: MusicCreateDTO = this.form.value;

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

  // Função para editar uma música
  editMusic(music: MusicCreateDTO): void {
    this.form.setValue({
      name: music.name,
      artist: music.artist,
    });
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
}
