import { IsString } from 'class-validator';

export class AlbumId {
    @IsString()
    albumId: string;
}