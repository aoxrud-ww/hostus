import firebase from 'firebase/app';
import firebaseui from 'firebaseui';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBXSg8E8m5QHmyYr9fJgBs2Ci3rllHF36A",
  authDomain: "hostus-7b6fe.firebaseapp.com",
  projectId: "hostus-7b6fe"
});

const ui = new firebaseui.auth.AuthUI(firebaseApp.auth());

const auth = (onInit, onReady) => {
  ui.start('#firebaseui-auth-container', {
    signInOptions: [{
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        onInit(authResult);
        return false;
      },
      uiShown: onReady
    },
  });
}


export default {
  firebase,
  firebaseui,
  firebaseApp,
  ui,
  auth
};