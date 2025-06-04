
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {collection, getDocs, getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage()
const fireStore = getFirestore()


const fetchFromFirestore = async() => {
    try {
        const productsCollection = collection(fireStore, 'products')
        const productSnapshot = await getDocs(productsCollection)
        const productList = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        console.log('fetched products from firestore',productList)
        return productList
    } catch (error) {
        console.error('error fetching products from firestore: ',error)
    }
}

export {
    auth,
    provider,
    storage,
    fireStore,
    fetchFromFirestore,
}