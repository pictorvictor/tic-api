import { Track } from './track.interface';

export interface Album {
    id: string;
    title: string;
    artist: string;
    genre: string;
    image: string;
    tracks: Track[];
    downloadUrl: string;
  }
