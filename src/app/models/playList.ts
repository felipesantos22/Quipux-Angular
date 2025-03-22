import { Music } from "./music";

export interface Playlist {
    id: number;
    nome: string;
    descricao: string;
    musicas: Music[];
  }