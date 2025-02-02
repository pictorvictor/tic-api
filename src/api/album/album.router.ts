import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '../../utils/constants';
import { AlbumController } from './album.controller';
import { Routes } from '../../utils/interfaces/routes.interface';
import { authMiddleware } from '../../utils/middlewares/auth.middleware';
import { RequestWithUser } from '../../utils/interfaces/auth.interface';

class AlbumRouter implements Routes {
  public path = '/albums';
  public router = Router();
  public albumController = new AlbumController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(ROUTES.albums.getAlbums,authMiddleware, this.getAlbums);
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
}

export default AlbumRouter;
