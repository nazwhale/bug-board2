import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCKytAJOozuPk5zLsDWTnwZzxGxsR5XB1s",
  authDomain: "bugs-board.firebaseapp.com",
  databaseURL: "https://bugs-board.firebaseio.com",
  projectId: "bugs-board",
  storageBucket: "bugs-board.appspot.com",
  messagingSenderId: "264359786595"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('posts/');
