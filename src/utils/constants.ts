export const SUCCESS_MESSAGE = 'SUCCESS';

export const ROUTES = {
  testing: {
    healthCheck: '/testing/health-check',
  },
  albums: {
    getAlbums: '/albums',
    createAlbum: '/albums',
    updateAlbum: '/albums/:id',
    deleteAlbum: '/albums/:id',
  }
};

export const CUSTOM_ERROR_MESSAGES = {
  INVALID_LOGIN: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  BAD_REQUEST: 'Bad request',
  NOT_FOUND: 'Not found',
};

