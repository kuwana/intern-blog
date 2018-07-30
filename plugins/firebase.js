import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCq5pu0ybKK9TLZBkqRw8tSgLT84DXAvDQ',
  authDomain: 'internship-nuxt-blog.firebaseapp.com',
  databaseURL: 'https://internship-nuxt-blog.firebaseio.com',
  projectId: 'internship-nuxt-blog',
  storageBucket: 'internship-nuxt-blog.appspot.com',
  messagingSenderId: '774369886747',
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const Auth = firebase.auth()
const DB = firebase.firestore()
const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()

DB.settings({timestampsInSnapshots: true})

export { firebase, Auth, DB, TIMESTAMP }
