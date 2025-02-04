import { Controller, Get, Route, Tags, Security, Post, Body, Request, Put, Path } from 'tsoa';
import { ROUTES } from '../../utils/constants';
import { getAlbums, createAlbum, getUserAlbums, updateAlbum, deleteAlbum } from './album.service';
import { CreateAlbumReqDto } from './dtos/create-album.dto';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import { UpdateAlbumReqDto } from './dtos/update-album.dto';

@Route('api')
@Tags('Albums')
export class AlbumController extends Controller {
  @Get(ROUTES.albums.getAlbums)
  @Security('token')
  public async getAlbums() {
    return getAlbums();
  }

  @Post(ROUTES.albums.createAlbum)
  @Security('token')
  public async createAlbum(@Body() body: CreateAlbumReqDto, @Request() user: UserInfo) {
    return createAlbum(body, user);
  }

  @Get(ROUTES.albums.getUserAlbums)
  @Security('token')
  public async getUserAlbums(@Request() user: UserInfo) {
    return getUserAlbums(user);
  }

  @Put(ROUTES.albums.updateAlbum)
  @Security('token')
  public async updateAlbum(@Body() body: UpdateAlbumReqDto, @Path() albumId: string) {
    return updateAlbum(body, albumId);
  }

  @Post(ROUTES.albums.deleteAlbum)
  @Security('token')
  public async deleteAlbum(@Request() user: UserInfo, @Path() albumId: string) {
    return deleteAlbum(user, albumId);
  }
}
