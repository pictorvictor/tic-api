import { IsString, IsArray } from "class-validator";

export class UpdateAlbumReqDto {
    @IsString()
    title: string;
    @IsString()
    artist: string;
    @IsString()
    genre: string;
    @IsString()
    image: string;
    @IsArray()
    tracks: UpdateTrackReqDto[];
}

export class UpdateTrackReqDto {
    @IsString()
    title: string;
    @IsString()
    url: string;
    @IsString()
    id: string;
}