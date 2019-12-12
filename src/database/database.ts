import * as admin from 'firebase-admin';
import * as serviceAccount from './database.config.json';

export default !admin.apps.length
    // @ts-ignore
    ? admin.initializeApp({credential: admin.credential.cert(serviceAccount)}).firestore()
    : admin.app().firestore();
