import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar } from '@chakra-ui/react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, CollectionReference } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { Auth, getAuth } from 'firebase/auth';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { db } from '../../firebase.config';

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
  const [userProfile, loadingUserProfile, errorLoadingUserProfile] = useDocument(
    doc(usersCollectionRef, user?.uid || 'asdf')
  );
  console.log(userProfile?.data());

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return <Spinner />;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <><><Flex>
      <Box>
        <Heading>Personal info</Heading>
      </Box>
    </Flex><Flex>
        <Box>
          <Avatar name={userProfile?.data()?.name} src={userProfile?.data()?.profile_picture} width="100px" height="100px" />
        </Box>
        <Box>
          <Heading>{userProfile?.data()?.name}</Heading>
          <Text>{userProfile?.data()?.email}</Text>
        </Box>
      </Flex></><Flex>
        <Box>
          <Heading>Photos</Heading>
        </Box>
      </Flex><Flex>
        <Box boxSize='sm'>
          <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        </Box>
        <Box boxSize='sm'>
          <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        </Box>
        <Box boxSize='sm'>
          <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        </Box>
      </Flex></>
  );

  return <Box>{userProfile?.data()?.email} {userProfile?.data()?.name}</Box>;
}

export default ProfilePage;
