import { Box, Button, Flex, Heading, Input, Stack, HStack, Spinner, RadioGroup, Radio } from '@chakra-ui/react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, CollectionReference } from 'firebase/firestore';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../../firebase.config';
import { set } from 'firebase/database';

interface User {
  id: string;
  name: string;
  mark: number;
  profile_picture: string;
  role: string;
}
export function FirebaseDemo() {
  const [newName, setNewName] = useState('');
  const [newMark, setNewMark] = useState(0);
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [newRole, setNewRole] = useState('');

  const usersCollectionRef = collection(db, 'users');

  const [users, usersLoading, usersError] = useCollection(query(usersCollectionRef) as CollectionReference<User>);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, mark: Number(newMark), profile_picture: newProfilePicture, role: newRole }); 
  };

  const updateUser = async (id: string, mark: number) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { mark: mark + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id: string) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  };

  const displayProfilePicture = (profilePicture: string) => {
    return profilePicture ? (
      <img src={profilePicture} alt="profile picture" style={{ width: '100px', height: '100px' }} />
    ) : (
      <Box>No profile picture</Box>
    );
    }

  if (usersLoading) {
    return <Spinner />;
  }

  if (usersError) {
    return <Box>Error fetching users</Box>;
  }

  return (
    <Flex flexDir="column" gap="8" padding="6">
      <Flex flexDir="column" gap="6" border="1px" borderColor="gray.200" width="20%" px="6" py="8">
        <Stack spacing="3">
          <Input
            onChange={(event) => {
              setNewName(event.target.value);
            }}
            placeholder="Name..."
            size="sm"
          />
          <Input
            type="number"
            placeholder="Mark..."
            onChange={(event) => {
              setNewMark(Number(event.target.value));
            }}
            size="sm"
          />
          <Input
            onChange={(event) => {
              setNewProfilePicture(event.target.value);
            }}
            placeholder="Write yours url image..."
            size="sm"
          />
          <RadioGroup 
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
        <Button width="50%" size="sm" colorScheme="green" onClick={createUser}>
          Create User
        </Button>
      </Flex>
      <Flex gap="4" flexWrap="wrap">
        {users &&
          users.docs.map((user) => (
            <Box gap="6" border="1px" borderColor="gray.300" width="20%" px="6" py="8" key={user.id}>
              <Heading>Name: {user.data().name}</Heading>
              <Heading>Mark: {user.data().mark}</Heading>
              {displayProfilePicture(user.data().profile_picture)}
              <Heading>Role: {user.data().role}</Heading>
              <HStack gap="4" mt="4">
                <Button size="sm" colorScheme="green" onClick={() => updateUser(user.id, user.data().mark)}>
                  Increase Mark
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => deleteUser(user.id)}>
                  Delete User
                </Button>
              </HStack>
            </Box>
          ))}
      </Flex>
    </Flex>
  );
}

export default FirebaseDemo;
