/* eslint-disable */
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.userCreated = functions.auth.user().onCreate(async (user) => {
    console.log('Creating user: ', user.displayName)

    try {
        await admin.firestore().collection('users').doc(user.uid).set({ id: user.uid, email: user.email, name: user.displayName });
        console.log('User created:', user.displayName)
    } catch (error) {
        console.log('Error creating user: ', error)
    }

  });
