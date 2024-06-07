import { Box, Button, Input, Stack, Checkbox, Image, Center, Card, Wrap, Heading } from '@chakra-ui/react';
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
    


    return <Center minHeight="100vh" backgroundColor="#f0f4f8">
    <Card
      // align='center'
      px='8vh'
      pb='6vh'
      pt='3vh'
      border='medium'
      color='#00232a'
      borderRadius='20px'
    ><Stack spacing="3">
      
        <Button onClick={() => navigate('/profile')}fontSize='24px' fontWeight="bold" margin='10px' variant='ghost' borderRadius='100px' border='2px solid #005465' _hover={{ bg: '#C6EFF6' }} width="5vh" 
        height='5vh'>←</Button>
        
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
        <Stack width={600} align='center'>
        <Image src={newPhoto || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0ydDiYMYriRcJDdqE8NZxnRisT4XZmc7AQ&s'} width={'auto'} height={'auto'} maxWidth={600} maxHeight={600} border={'2px solid black'} onClick={() => setEditingPhoto(true)} />
        </Stack>
      }
    <Stack spacing='20px'>
    
    <Heading size='sm'>Choose Categories:</Heading>
    <Wrap spacing='3.5vh'>
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

        <Button onClick={() => { showCategoryInput(true) }}>+</Button>

        }
        {categoryList.map((category) => <Checkbox colorScheme='blue' onChange={(event) => {
            if (event.target.checked) {
                setChoosedCategories([...choosedCategories, category]);
            } else {
                setChoosedCategories(choosedCategories.filter((item) => item !== category));
            }
        }
        }>{category}</Checkbox>)}
    </Wrap>
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
      <Button width="50%" size="sm" bg='#62daf2' onClick={() => {
        addPhotoButton({description: newDescription || '', location: newLocation || '', camera_model: newCameraModel || '', photo_url: newPhoto || '', categories: choosedCategories});
        navigate('/profile');
        }}>
      Add Photo
      </Button>
      </Stack></Card>
      </Center>
  }