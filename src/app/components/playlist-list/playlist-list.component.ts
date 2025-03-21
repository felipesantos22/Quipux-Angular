// playlist-list.component.ts

import { Component, OnInit } from '@angular/core';
import { PlaylistService, Playlist, Music } from '../../services/playlist.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css'
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];
  newMusic: Music = { titulo: '', artista: '', album: '', ano: '', genero: '' }; // Formulário para nova música
  selectedPlaylistId: number | null = null; // ID da playlist selecionada

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists() {
    this.playlistService.getPlaylists().subscribe((data) => {
      this.playlists = data;
    });
  }

  deletePlaylist(id: number) {
    this.playlistService.deletePlaylist(id).subscribe(() => {
      this.playlists = this.playlists.filter((p) => p.id !== id);
    });
  }

  addMusicToPlaylist() {
    if (this.selectedPlaylistId && this.newMusic) {
      this.playlistService.addMusicToPlaylist(this.selectedPlaylistId, this.newMusic).subscribe((updatedPlaylist) => {
        const playlistIndex = this.playlists.findIndex((p) => p.id === updatedPlaylist.id);
        if (playlistIndex > -1) {
          this.playlists[playlistIndex] = updatedPlaylist;
        }
      });
    }
  }
}
