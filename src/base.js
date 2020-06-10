import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBFZbok-2eska47fyyZYQaHatb4ooQp3Mg",
    authDomain: "catch-of-the-day-reactbeginner.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-reactbeginner.firebaseio.com",
}

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export default base;