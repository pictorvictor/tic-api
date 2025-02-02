import FirebaseAdmin from '../../firebase';
import { Album } from '../../utils/interfaces/album.interface';

const getAlbums = async () => {
    const db = FirebaseAdmin.firebase.firestore();
    const albumsRef = db.collection('albums');
    const snapshot = await albumsRef.get();
    const albums = snapshot.docs.map((doc) => doc.data());
    return albums as Album[];
}

export {
    getAlbums
}