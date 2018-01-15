/**
 * Created by hazem on 11/01/2018.
 */
import firebase from 'firebase';
const config = {
    apiKey: "%YOUR_API_KEY%",
    authDomain: "%YOUR_AUTH_DOMAIN",
    databaseURL: "%YOUR_DATABASE_URL",
    projectId: "%YOUR_PROJECT_ID",
    storageBucket: "%YOUR_STORAGE_BUCKET",
    messagingSenderId: "%YOUR_MESSAGING_SENSER_ID%"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;