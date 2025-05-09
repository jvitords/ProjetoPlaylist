import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PlaylistCompComponent } from './playlist-comp/playlist-comp.component';
import { MusicCompComponent } from './music-comp/music-comp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PlaylistCompComponent,
    MusicCompComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projetoPlaylistFrontEnd';
}
