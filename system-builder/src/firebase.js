import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyCOosobkvQdc9e8AMvx8sbVE9QTJqf6zQY",
    authDomain: "system-builder-770e1.firebaseapp.com",
    databaseURL: "https://system-builder-770e1.firebaseio.com",
    projectId: "system-builder-770e1",
    storageBucket: "system-builder-770e1.appspot.com",
    messagingSenderId: "887898997718",
    appId: "1:887898997718:web:5347c515aed2689676da77"
})

export const db = app.database();
export const feed = db.ref('feed');
export const categories = db.ref('categories');