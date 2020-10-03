import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyC6_alDHNQY3fJenOdpQNK0BbBXVgO-SHs",
    authDomain: "v-listing.firebaseapp.com",
    databaseURL: "https://v-listing.firebaseio.com",
    projectId: "v-listing",
    storageBucket: "v-listing.appspot.com",
    messagingSenderId: "225514268928",
    appId: "1:225514268928:web:78eac6cb1d66ef823a2be5"
})

export const db = app.database();
export const namesRef = db.ref('names');