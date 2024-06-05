import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Card } from '@chakra-ui/react';

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";


import { storage } from '../../../firebase.config';
import { useState } from 'react';

export const ProfileForm = (props: { userUid: any; userData: any; updateUser: any; }) => {
    const {userUid, userData, updateUser} = props;
    const [newName, setNewName] = useState(userData.name);
    const [newProfilePicture, setNewProfilePicture] = useState(userData.profile_picture);
    const [newRole, setNewRole] = useState(userData.role);
    const [isEditingProfilePicture, setEditingProfilePicture] = useState(false);
    return <Center minHeight="100vh" backgroundColor="#f0f4f8">
    <Card
      align='center'
      width="80vh"
      maxWidth="80vh"
      height="70vh"
      p='8vh'
      border='medium'
      color='#00232a'
      borderRadius='20px'
    >
      <Stack justify="center" spacing='35'>
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16" color='00232a'>
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>
      {isEditingProfilePicture ?
        <Input
          onChange={async (event) => {
            if (event.target.files && event.target.files.length > 0 && event.target.files[0] !== undefined) {
              const imageRef = ref(storage, `profilePhotos/${userUid}`);
              const imageSnapshot = await uploadBytes(imageRef, event.target.files[0]);
              const imageUrl = await getDownloadURL(imageSnapshot.ref);
              setNewProfilePicture(imageUrl);
              setEditingProfilePicture(false);
            }
          }}
          accept="image/png,image/jpeg"
          type="file"
          size="lg"
          borderRadius='10px'
          width="28vh" 
          height='6vh'
          pt='1.4vh'
          pb='3vh'

        /> :
        <Avatar name={userData.name} src={newProfilePicture} width="200px" height="200px" onClick={() => setEditingProfilePicture(true)}/>
      }
      <Input
        defaultValue={newName}
        onChange={(event) => {
          setNewName(event.target.value);
        }}
        placeholder="Name..."
        size="lg"
        width="40vh" 
        height='6vh'
        bg='#bee8f0' 
        borderRadius='30px'
      />
      <RadioGroup
        defaultValue={newRole}
        onChange={(value) => {
          setNewRole(value);
        }}
        size='lg'
        
      >
        <Stack spacing='6vh' direction='row'>
          <Radio  value='Student'>Student</Radio>
          <Radio value='Mentor'>Mentor</Radio>
        </Stack>
      </RadioGroup>
      
      <Button size="lg"
        width="20vh" 
        height='4vh'
        borderRadius='15px'
        bg="#62daf2" 
        onClick={() => {
        updateUser(userUid, {
          name: newName || userData.name, profile_picture: newProfilePicture || userData.name, role: newRole || userData.name });
      }}>
      Update User
      </Button>
      </Stack>
      </Card>
      </Center>
  }