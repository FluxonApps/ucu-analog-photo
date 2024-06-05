import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Spacer, InputLeftElement, InputGroup} from '@chakra-ui/react';
import { collection, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';

import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { db, storage } from '../../firebase.config';

import { useEffect, useState } from 'react';
import { ProfileCard } from './util/ProfileCard';
import { PhotoCard } from './util/PhotoCard';

const auth = getAuth();


export function ProfilePage() {
  const [user, userLoading] = useAuthState(auth);
  const usersCollectionRef = collection(db, 'users');

  const [docRef, setDocRef] = useState<any>(null);
  
  useEffect(() => {
    if (user?.uid && (!docRef || docRef.id !== user.uid)) {
      setDocRef(doc(usersCollectionRef, user.uid));
    }
  }, [user, usersCollectionRef]);
  
  const [userProfile, loadingUserProfile] = useDocument(docRef);

  const [photoAuthor, loadingPhotoAuthor] = useDocument(doc(db, 'users', 'xQbvuayjyZNlasY4pekRHOeU2sE2'));
  const [userPhoto, loadingUserPhoto] = useDocument(doc(db, 'userPhotos', 'hs6KELRbh2wa0itcXwDL'));
  console.log(photoAuthor);
  // Do not show page content until auth state is fetched.
  if (userLoading || loadingUserProfile || loadingUserPhoto || loadingPhotoAuthor || !userProfile || !userPhoto || !photoAuthor) {
    return <Spinner />;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }


  return <PhotoCard userData={userProfile?.data()} userPhoto={userPhoto?.data()} photoAuthor={photoAuthor?.data()}></PhotoCard>
}

export default ProfilePage;
