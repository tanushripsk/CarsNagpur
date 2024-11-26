import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCDN3JEoIi8SbDCV1Mjbthy4L1FnG9fU8M",
  authDomain: "otphoonja.firebaseapp.com",
  projectId: "otphoonja",
  storageBucket: "otphoonja.appspot.com",
  messagingSenderId: "330994487742",
  appId: "1:330994487742:web:7d18ec99f1f4f5b6d529ef",
  measurementId: "G-3ZL0SLQ416"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Firebase Auth to use popup-based sign-in flow
auth.useDeviceLanguage();
auth.settings.appVerificationDisabledForTesting = true;

export { auth };
