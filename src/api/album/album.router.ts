import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '../../utils/constants';
import { AlbumController } from './album.controller';
import { Routes } from '../../utils/interfaces/routes.interface';
import { authMiddleware } from '../../utils/middlewares/auth.middleware';
import { RequestWithUser, UserInfo } from '../../utils/interfaces/auth.interface';
import validationMiddleware from '../../utils/middlewares/validation.middleware';
import { CreateAlbumReqDto } from './dtos/create-album.dto';
import { UpdateAlbumReqDto } from './dtos/update-album.dto';
import { AlbumId } from './dtos/album-id.dto';

class AlbumRouter implements Routes {
  public path = '/albums';
  public router = Router();
  public albumController = new AlbumController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(ROUTES.albums.getAlbums, authMiddleware, this.getAlbums);
    this.router.post(ROUTES.albums.createAlbum, authMiddleware, validationMiddleware(CreateAlbumReqDto), this.createAlbum);
    this.router.get(ROUTES.albums.getUserAlbums, authMiddleware, this.getUserAlbums);
    this.router.put(ROUTES.albums.updateAlbum, validationMiddleware(UpdateAlbumReqDto), validationMiddleware(AlbumId, 'params'), authMiddleware, this.updateAlbum);
    this.router.delete(ROUTES.albums.deleteAlbum,  validationMiddleware(AlbumId, 'params'), authMiddleware, this.deleteAlbum);
  };

  private getAlbums = async (
    _req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await this.albumController.getAlbums();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private createAlbum = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body = req.body;
      const user = req.user as UserInfo;
      const response = await this.albumController.createAlbum(body, user);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private getUserAlbums = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user as UserInfo;
      const response = await this.albumController.getUserAlbums(user);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private updateAlbum = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body = req.body;
      const albumId = req.params.albumId;
      const response = await this.albumController.updateAlbum(body, albumId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private deleteAlbum = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const albumId = req.params.albumId;
      const user = req.user as UserInfo;
      const response = await this.albumController.deleteAlbum(user, albumId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default AlbumRouter;
