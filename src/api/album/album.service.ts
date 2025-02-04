import FirebaseAdmin from '../../firebase';
import { generateRandomString } from '../../lib/crypto';
import { Album } from '../../utils/interfaces/album.interface';
import { CreateAlbumReqDto } from './dtos/create-album.dto';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import { UpdateAlbumReqDto } from './dtos/update-album.dto';
import { HttpException } from '../../utils/http-exception';
import { CUSTOM_ERROR_MESSAGES } from '../../utils/constants';

const getAlbums = async () => {
    const db = FirebaseAdmin.firebase.firestore();
    const albumsRef = db.collection('albums');
    const snapshot = await albumsRef.get();
    const albums = snapshot.docs.map((doc) => doc.data());
    return albums as Album[];
}

const createAlbum = async (album: CreateAlbumReqDto, user: UserInfo ) => {
    const db = FirebaseAdmin.firebase.firestore();
    const albumsRef = db.collection('albums');
    const tracksWithIds = album.tracks.map((track) => ({
        id: generateRandomString(12),
        title: track.title,
        url: track.url
    }));
    const albumObject = {
        id: generateRandomString(12),
        title: album.title,
        artist: album.artist,
        genre: album.genre,
        image: album.image,
        downloadUrl: "", // todo generate download url for zip of tracks
        tracks: tracksWithIds,
        userId: user.userId
    }
    await albumsRef.doc(albumObject.id).set(albumObject);
    return albumObject;
}

const getUserAlbums = async (user: UserInfo) => {
    const db = FirebaseAdmin.firebase.firestore();
    const albumsRef = db.collection('albums');
    const snapshot = await albumsRef.where('userId', '==', user.userId).get();
    const albums = snapshot.docs.map((doc) => doc.data());
    return albums as Album[];
}

const updateAlbum = async (album: UpdateAlbumReqDto, albumId: string) => {
    const db = FirebaseAdmin.firebase.firestore();
    const albumsRef = db.collection('albums');
    await albumsRef.doc(albumId).set(album);
    return album;
}

const deleteAlbum = async (user: UserInfo, albumId: string) => {
    const db = FirebaseAdmin.firebase.firestore();
    const albumsRef = db.collection('albums');
    const album = await albumsRef.doc(albumId).get();
    if (album?.data()?.userId !== user.userId) {
        throw new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403);
    }
    await albumsRef.doc(albumId).delete();
    return { message: 'SUCCESS' };
}

export {
    getAlbums,
    createAlbum,
    getUserAlbums,
    updateAlbum,
    deleteAlbum
}