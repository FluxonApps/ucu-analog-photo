import { Box, Button, Input, Stack, Avatar } from '@chakra-ui/react';
import { storage } from '../../../firebase.config';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';


export const AddPhotoForm = (props: { addPhotoButton: any }) => {
    const {addPhotoButton} = props;

    const [newDescription, setNewDescription] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newCameraModel, setNewCameraModel] = useState('');
    const [newPhoto, setNewPhoto] = useState('');
    const [isEditingPhoto, setEditingPhoto] = useState(false);

    const navigate = useNavigate();

    return <Box>
        <Button onClick={() => navigate('/profile')}>{'<-'}</Button>
        <Stack spacing="3">
      {isEditingPhoto ?
        <Input
          onChange={async (event) => {
            if (event.target.files && event.target.files.length > 0 && event.target.files[0] !== undefined) {
              const imageRef = ref(storage, `userPhotos/${uuidv4()}`);
              const imageSnapshot = await uploadBytes(imageRef, event.target.files[0]);
              const imageUrl = await getDownloadURL(imageSnapshot.ref);
              setNewPhoto(imageUrl);
              setEditingPhoto(false);
            }
          }}
          accept="image/png,image/jpeg"
          type="file"
          size="sm"
        /> :
        <Avatar src={newPhoto} width="100px" height="100px" onClick={() => setEditingPhoto(true)}/>
      }
      <Input
        defaultValue={newDescription}
        onChange={(event) => {
          setNewDescription(event.target.value);
        }}
        placeholder="Description"
        size="sm"
      />
      <Input
        defaultValue={newLocation}
        onChange={(event) => {
          setNewLocation(event.target.value);
        }}
        placeholder="Location"
        size="sm"
      />
      <Input
        defaultValue={newCameraModel}
        onChange={(event) => {
          setNewCameraModel(event.target.value);
        }}
        placeholder="Camera Model"
        size="sm"
      />
      </Stack>
      <Button width="50%" size="sm" colorScheme="green" onClick={() => {
        addPhotoButton({description: newDescription || '', location: newLocation || '', camera_model: newCameraModel || '', photo_url: newPhoto || '' });
        }}>
      Add Photo
      </Button></Box>
  }