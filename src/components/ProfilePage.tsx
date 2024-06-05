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

import { useEffect, useState } from 'react';
import { ProfileForm } from './util/ProfileForm';
import { ProfileCard } from './util/ProfileCard';

const auth = getAuth();

interface User {
  id: string;
  name: string;
  mark: number;
}


export function ProfilePage() {
  const [user, userLoading] = useAuthState(auth);
  const [signOut, isSigningOut] = useSignOut(auth);
  const usersCollectionRef = collection(db, 'users');

  const [docRef, setDocRef] = useState<any>(null);
  
  useEffect(() => {
    if (user?.uid && (!docRef || docRef.id !== user.uid)) {
      setDocRef(doc(usersCollectionRef, user.uid));
    }
  }, [user, usersCollectionRef]);
  
  const [userProfile, loadingUserProfile] = useDocument(docRef);
  const [isEditing, setEditing] = useState(false);

  const updateUser = async (id: string, newFields: any) => {
    const userDoc = doc(db, 'users', id);
    console.log(newFields);
    setEditing(false);
    await updateDoc(userDoc, newFields);
    setEditing(false)
  };

  // Do not show page content until auth state is fetched.
  if (userLoading || loadingUserProfile || !userProfile) {
    return <Spinner />;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (isEditing) {
    return <ProfileForm userUid={user.uid} userData={userProfile?.data()} updateUser={updateUser}/>
  } else {
    return <ProfileCard userData={userProfile?.data()} setEditing={setEditing}></ProfileCard>
  }
}

export default ProfilePage;
