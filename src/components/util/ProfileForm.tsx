import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center } from '@chakra-ui/react';

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
    return <Box><Stack spacing="3">
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
          size="sm"
        /> :
        <Avatar name={userData.name} src={newProfilePicture} width="100px" height="100px" onClick={() => setEditingProfilePicture(true)}/>
      }
      <Input
        defaultValue={newName}
        onChange={(event) => {
          setNewName(event.target.value);
        }}
        placeholder="Name..."
        size="sm"
      />
      <RadioGroup
        defaultValue={newRole}
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
        updateUser(userUid, {
          name: newName || userData.name, profile_picture: newProfilePicture || userData.name, role: newRole || userData.name });
      }}>
      Update User
      </Button></Box>
  }