import * as firebase from 'firebase';
import moment from 'moment';

  // Initialize Firebase
  var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);
  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {firebase, googleAuthProvider, database as default};


//   const expenses = [
//     {
//         description: 'Iphone x',
//         note:'exotic smart phone',
//         amount: 100000,
//         createdAt: moment().format("MMM Do YY")
//     },
//     {
//         description: 'Iphone 8',
//         note:'brilliant smart phone',
//         amount: 850000,
//         createdAt: moment().format("MMM Do YY")
//     },
//     {
//         description: 'Iphone 7',
//         note:'great smart phone',
//         amount: 700000,
//         createdAt: moment().format("MMM Do YY")
//     }
//   ]

//   expenses.forEach((expense) =>{
//       database.ref('expenses').push(expense);
//   });

// //   let expenses = [];

// //   database.ref('expenses')
// //     .on('value', (snapshot)=>{
// //         snapshot.forEach((childSnapshot)=>{
// //             expenses.push({
// //                 id: childSnapshot.key,
// //                 ...childSnapshot.val()
// //             });
// //         });
// //         console.log(expenses);
// //     });

//   database.ref('expenses').on('child_added',(snapshot)=>{
//     console.log(snapshot.key, snapshot.val())
//   });