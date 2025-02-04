import { faker } from "@faker-js/faker";
import FirebaseAdmin from "../firebase";
import { getAlbums } from "../api/album/album.service";
import { Album } from "../utils/interfaces/album.interface";
import { Track } from "../utils/interfaces/track.interface";

const seed = async () => {
  const db = FirebaseAdmin.firebase.firestore();
  const albumsRef = db.collection("albums");

  const existingAlbums = await getAlbums();
  if (existingAlbums.length > 0) {
    console.log("Albums already exist. Skipping seeding.");
    return;
  }

  const albumCount = faker.number.int({ min: 4, max: 10 });

  const albums: Album[] = Array.from({ length: albumCount }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(2),
    artist: faker.person.fullName(),
    genre: faker.music.genre(),
    image: faker.image.url({ width: 300, height: 200 }),
    tracks: Array.from({ length: faker.number.int({ min: 3, max: 7 }) }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.words(2),
    //   url: faker.internet.url(),
      url: "https://firebasestorage.googleapis.com/v0/b/camp-band.firebasestorage.app/o/Dani%20Mocanu%20-%20Domn%20Judecator%20%EF%BD%9C%20Official%20Video.mp3?alt=media&token=18685a80-be38-4352-b85a-b44f4255beff",
    })) as Track[],
    downloadUrl: faker.internet.url(),
  }));

  for (const album of albums) {
    await albumsRef.doc(album.id).set(album);
    console.log(`Added album: ${album.title}`);
  }

  console.log(`${albumCount} albums added successfully!`);
};

seed().catch((error) => console.error("Seeding error:", error));

export default seed;
