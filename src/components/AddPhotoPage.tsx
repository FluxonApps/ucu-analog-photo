import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Spacer, InputLeftElement, InputGroup} from '@chakra-ui/react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, CollectionReference } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { Auth, getAuth } from 'firebase/auth';
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { db, storage } from '../../firebase.config';
console.log(storage);
import { useState } from 'react';
import { AddPhotoForm } from './util/AddPhotoForm';

const auth = getAuth();

interface User {
  id: string;
  name: string;
  mark: number;
}

export function AddPhotoPage() {
  const [user, userLoading] = useAuthState(auth);
  const [signOut, isSigningOut] = useSignOut(auth);
  const usersCollectionRef = collection(db, 'users');
  const [userProfile, loadingUserProfile, errorLoadingUserProfile] = useDocument(
    doc(usersCollectionRef, user?.uid || 'asdf')
  );

  const [isEditing, setEditing] = useState(true);

  const [newName, setNewName] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [newRole, setNewRole] = useState('');


  // const userPhotosDoc = collection(db, 'users', userUid, 'photos');
  // await addDoc(userPhotosDoc, {photoUrl: photoUrl});

  const updateUser = async (id: string, newFields: any) => {
    const userDoc = doc(db, 'users', id);
    console.log(newFields);
    await updateDoc(userDoc, newFields);
  };

  const addPhoto = async (newPhoto: any) => {
    if (!user) {
      return;
    }
    const newPhotoWithUser = {...newPhoto, user: doc(db, 'users', user?.uid)};
    const allPhotos = collection(db, 'userPhotos');
    await addDoc(allPhotos, newPhotoWithUser);

  }

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return <Spinner />;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (<AddPhotoForm addPhotoButton={addPhoto} />);

}

export default AddPhotoPage;
