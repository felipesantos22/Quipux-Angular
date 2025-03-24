// playlist-list.component.ts

import { Component, OnInit } from '@angular/core';
import { PlaylistService} from '../../services/playlist.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css'
})
export class PlaylistListComponent implements OnInit {
  playlists: any[] = [];
  newPlaylist = { nome: '', descricao: '' };
  newMusic = { titulo: '', artista: '', playlistId: null };

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.loadPlaylists();
  }

  // Criar Playlist
  createPlaylist() {
    this.playlistService.createPlaylist(this.newPlaylist.nome, this.newPlaylist.descricao)
      .subscribe(() => {
        this.loadPlaylists();
        this.newPlaylist = { nome: '', descricao: '' };
      });
  }

  // Adicionar Música a uma Playlist
  addMusic() {
    this.playlistService.addMusicToPlaylist(this.newMusic.playlistId!, this.newMusic.titulo, this.newMusic.artista)
      .subscribe(() => {
        this.loadPlaylists();
        this.newMusic = { titulo: '', artista: '', playlistId: null };
      });
  }

  // Carregar Playlists
  loadPlaylists() {
    this.playlistService.getPlaylists().subscribe(data => {
      this.playlists = data;
    });
  }

  deleteMusic(idMusic: number): void {
    this.playlistService.deleleMusic(idMusic).subscribe(
      response => {
        console.log('Música deletada com sucesso', response);
        // this.loadMusics(); // Carregar novamente a lista de músicas ou outras ações
      },
      error => {
        console.error('Erro ao deletar música', error);
      }
    );
  }
  

}
