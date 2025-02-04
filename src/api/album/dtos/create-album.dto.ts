import { IsString, IsArray } from "class-validator";

export class CreateAlbumReqDto {
    @IsString()
    title: string;
    @IsString()
    artist: string;
    @IsString()
    genre: string;
    @IsString()
    image: string;
    @IsArray()
    tracks: CreateTrackReqDto[];
}

export class CreateTrackReqDto {
    @IsString()
    title: string;
    @IsString()
    url: string;
}