import { Box, Button, Input, Stack, Avatar, Tag, Checkbox, Image, Card } from '@chakra-ui/react';
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

      
    const [isShowingNewCategoryInput, showCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [categoryList, setCategoryList] = useState(['Nature', 'Traveling']);
    const [choosedCategories, setChoosedCategories] = useState<string[]>([]);
    


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
        <Box width={600} >
        <Image src={newPhoto || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0ydDiYMYriRcJDdqE8NZxnRisT4XZmc7AQ&s'} width={'auto'} height={'auto'} maxWidth={600} maxHeight={600} border={'2px solid black'} onClick={() => setEditingPhoto(true)} />
        </Box>
      }
    <Box>Choose Categories</Box>
    <Box p={6}>
        { isShowingNewCategoryInput ?
            <Box><Input
            onChange={(event) => {
            setNewCategory(event.target.value);
            }}
            placeholder="Name..."
            size="sm"
        />
        <Button onClick={() => {
            const newCategoryList = [newCategory, ...categoryList];
            if (newCategory) {
            setCategoryList(newCategoryList)
            }
            showCategoryInput(false)
            }}>+</Button></Box>
        :

        <Button m={6} onClick={() => { showCategoryInput(true) }}>+</Button>

        }
        {categoryList.map((category) => <Checkbox colorScheme='blue' m={6} onChange={(event) => {
            if (event.target.checked) {
                setChoosedCategories([...choosedCategories, category]);
            } else {
                setChoosedCategories(choosedCategories.filter((item) => item !== category));
            }
        }
        }>{category}</Checkbox>)}
    </Box>
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
        addPhotoButton({description: newDescription || '', location: newLocation || '', camera_model: newCameraModel || '', photo_url: newPhoto || '', categories: choosedCategories});
        }}>
      Add Photo
      </Button></Box>
  }