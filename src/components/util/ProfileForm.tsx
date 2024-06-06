import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Card, IconButton} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useNavigate } from 'react-router-dom';

import { storage } from '../../../firebase.config';
import { useState } from 'react';
import ProfilePage from '../ProfilePage';

export const ProfileForm = (props: { userUid: any; userData: any; updateUser: any; }) => {
    const {userUid, userData, updateUser} = props;
    const [newName, setNewName] = useState(userData.name);
    const [newProfilePicture, setNewProfilePicture] = useState(userData.profile_picture);
    const [newRole, setNewRole] = useState(userData.role);
    const [isEditingProfilePicture, setEditingProfilePicture] = useState(false);
    const navigate = useNavigate();
    return <Center minHeight="100vh" backgroundColor="#f0f4f8">
    <Card
      align='center'
      px='8vh'
      pb='6vh'
      pt='3vh'
      border='medium'
      color='#00232a'
      borderRadius='20px'
    >
      <Stack justify="center" spacing='35'>
      <IconButton 
      icon={<ArrowBackIcon w={6} h={6} color='00232a' />}
      w={2} h={10} borderRadius='100px' variant='outline'  colorScheme='#f0f4f8'
      bg="none" align='right'
      onClick={()=> { console.log('here'); navigate('/profile')}}/>

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