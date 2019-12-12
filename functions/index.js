/* eslint-disable */
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const defaultFridge = {
    categories: ['meat', 'fish', 'vegetables', 'dairy', 'fruit'],
    fridge: []
}

exports.userCreated = functions.auth.user().onCreate(async (user) => {
    try {
        await admin.firestore().collection('users').doc(user.uid).set({ uid: user.uid, email: user.email, name: user.displayName });
    
        // reference to the new household
        const newHouseholdRef = admin.firestore().collection('households').doc();
        await newHouseholdRef.set(defaultFridge)

        await admin.firestore().collection('users').doc(user.uid).update({ household: newHouseholdRef.id })
    } catch (error) {
        console.log('Error creating user: ', error)
    }
  });
