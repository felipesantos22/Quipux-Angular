import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = '/api'; 

  constructor(private http: HttpClient) {}

  // Criar Playlist
  createPlaylist(nome: string, descricao: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/playlists`, { nome, descricao });
  }

  // Adicionar Música a uma Playlist
  addMusicToPlaylist(playlistId: number, titulo: string, artista: string): Observable<any> {
    const url = `${this.apiUrl}/musics/${playlistId}/add`; // Ajuste da URL
    return this.http.post(url, { titulo, artista });
  }
  
  // Listar todas as Playlists
  getPlaylists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/playlists`);
  }

  // Listar músicas de uma Playlist
  getMusicsByPlaylist(playlistId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/playlists/${playlistId}/musics`);
  }

   // Listar todas as Playlists
   getMusics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/musics`);
  }

  deleleMusic(idMusic: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/musics/${idMusic}`);
  }

  delelePlaylist(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/playlists/${id}`);
  }


}
