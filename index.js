//const express = require('express');
//const { Firestore } = require('@google-cloud/firestore');

//dependencies
import express from "express";
import { initializeApp } from "firebase/app";
import {   getDocs } from
'firebase/firestore/lite';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore as getFirestoreLite, collection as collectionLite, updateDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyALHwS6yXv9py4P-zE5Yt5BDKHHYbTpenw",
    authDomain: "ipccwtest.firebaseapp.com",
    projectId: "ipccwtest",
    storageBucket: "ipccwtest.appspot.com",
    messagingSenderId: "613957085545",
    appId: "1:613957085545:web:e3b83eed6b739d431fb5f8"
  };

//const app = express();

const app = initializeApp(firebaseConfig);
const db = getFirestoreLite(app);

// Initialize Firestore database
//const db = new Firestore();

const api = express();
api.use(express.json());

api.post('/sensor-data', async (req, res) => {
  try {
    const sensorData = req.body;

    // Store the sensor data in the Firestore database
    const docRef = await db.collectionLite('sensor-data').add(sensorData);

    res.status(201).json({ message: 'Sensor data added successfully', docId: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding sensor data' });
  }
});

api.listen(3000, () => {
  console.log('Server running on port 3000');
});
