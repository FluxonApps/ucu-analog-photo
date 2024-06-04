import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Spacer, InputLeftElement, InputGroup} from '@chakra-ui/react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, CollectionReference } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { Auth, getAuth } from 'firebase/auth';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import { db } from '../../firebase.config';
import { useState } from 'react';

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

  const [isEditing, setEditing] = useState(true);

  const [newName, setNewName] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [newRole, setNewRole] = useState('');

  const updateUser = async (id: string, newFields: any) => {
    const userDoc = doc(db, 'users', id);
    console.log(newFields);
    await updateDoc(userDoc, newFields);
  };


  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return <Spinner />;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (isEditing) {
    return  <Box><Stack spacing="3">
    <Input
      defaultValue={userProfile?.data()?.name}
      onChange={(event) => {
        setNewName(event.target.value);
      }}
      placeholder="Name..."
      size="sm"
    />
    <Input
      defaultValue={userProfile?.data()?.profile_picture}
      onChange={(event) => {
        setNewProfilePicture(event.target.value);
      }}
      placeholder="Write yours url image..."
      size="sm"
    />
    <RadioGroup
      defaultValue={userProfile?.data()?.role}
      onChange={(value) => {
        setNewRole(value);
      }}
    >
      <Stack direction='row'>
        <Radio value='Student'>Student</Radio>
        <Radio value='Mentor'>Mentor</Radio>
      </Stack>
    </RadioGroup>
  </Stack>
  <Button width="50%" size="sm" colorScheme="green" onClick={() => {
      updateUser(user.uid, { name: newName, profile_picture: newProfilePicture, role: newRole });
      setEditing(false);
    }}>
    Update User
  </Button></Box>

  } else {
    return <><Wrap justifyContent="center" alignItems="center" p={30}><><InputGroup size="lg">
    <InputLeftElement pointerEvents='none'>
      {/* <SearchIcon color='gray.300' /> */}
    </InputLeftElement>
    <Input placeholder='Search your photo' width="70vh"/>
  </InputGroup><Box>
    <Avatar name={userProfile?.data()?.name} src={userProfile?.data()?.profile_picture} width="50px" height="50px" />
    </Box>
    
    
    <Flex>
      <HStack spacing='80vh'>
        <Box>
          <Heading>Personal info</Heading>
        </Box>
        <Button onClick={() => setEditing(true)}>Edit</Button>
      </HStack>
      </Flex><Flex>
      <HStack spacing='60px' justify='center'>
          
          <Box>
            <Avatar name={userProfile?.data()?.name} src={userProfile?.data()?.profile_picture} width="100px" height="100px" />
          </Box>
          
          <Box>
            <Heading>{userProfile?.data()?.name}</Heading>
            <Text>{userProfile?.data()?.email}</Text>
            {userProfile?.data()?.role && (
            <Box as='button' borderRadius='md' bg='green' color='white' px={3} h={6}>
              {userProfile?.data()?.role}
            </Box>
          )} 
        </Box> 

        <Stack>
            <Text>3</Text>
            <Text>Posts</Text>
          </Stack>
          </HStack>
          
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
        </Flex>
        </Wrap></>
  }
}

export default ProfilePage;
