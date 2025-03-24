// playlist-list.component.ts

import { Component, OnInit } from '@angular/core';
import { PlaylistService} from '../../services/playlist.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Music } from '../../models/music';

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

  loadMusics(){
    this.playlistService.getMusics().subscribe(data => {
      this.playlists = data;
    });
  }

  deletePlaylist(playlistId: number) {
    this.playlistService.delelePlaylist(playlistId).subscribe(() => {
      // Remove a playlist da lista local
      this.playlists = this.playlists.filter(playlist => playlist.id !== playlistId);
    });
  }

  /* deleteMusic(musicId: number) {
    this.playlistService.deleleMusic(musicId).subscribe(() => {
      // Remover a música da lista da playlist
      this.playlists.forEach(playlist => {
        playlist.musicas = playlist.musicas.filter((music: Music) => music.id !== musicId);
      });
    });
  } */

  deleteMusic(musicId: number) {
    this.playlistService.deleleMusic(musicId).subscribe(() => {
      // Recarrega as playlists e suas músicas do servidor
      this.loadPlaylists();
    });
  }
  
}
