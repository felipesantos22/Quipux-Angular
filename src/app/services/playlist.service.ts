// playlist.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Playlist {
  id: number;
  nome: string;
  descricao: string;
  musicas: Music[];
}

export interface Music {
  titulo: string;
  artista: string;
  album: string;
  ano: string;
  genero: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = 'api/playlists';

  constructor(private http: HttpClient) {}

  // Método para obter todas as playlists
  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  // Método para excluir uma playlist
  deletePlaylist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para adicionar música a uma playlist
  addMusicToPlaylist(playlistId: number, music: Music): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.apiUrl}/${playlistId}/musicas`, music);
  }
}
