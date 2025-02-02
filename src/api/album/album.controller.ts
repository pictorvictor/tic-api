import { Controller, Get, Route, Tags, Security } from 'tsoa';
import { ROUTES } from '../../utils/constants';
import { getAlbums } from './album.service';

@Route('api')
@Tags('Albums')
export class AlbumController extends Controller {
  @Get(ROUTES.albums.getAlbums)
  @Security('token')
  public async getAlbums() {
    return getAlbums();
  }
}
