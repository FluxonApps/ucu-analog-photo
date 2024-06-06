import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Spacer, InputLeftElement, InputGroup, InputLeftAddon} from '@chakra-ui/react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, CollectionReference, where, or } from 'firebase/firestore';
import { useCollection, useDocument, } from 'react-firebase-hooks/firestore';
import { Auth, getAuth } from 'firebase/auth';
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';

import { db, storage } from '../../firebase.config';
console.log(storage);
import { useState } from 'react';

const auth = getAuth();



interface User {
  id: string;
  name: string;
  mark: number;
}



const PhotoListComponent = (props: { userPhotos: any; setSearchValue: any} )=>{
  const {userPhotos, setSearchValue} = props
  console.log(userPhotos)
  if (userPhotos?.docs.length > 0) {
    return <div> {userPhotos && userPhotos.docs.map((photo: any) => {
      const navigate_photo = useNavigate();

      console.log(photo.data())
    const [userProfile, loadingUserProfile, errorLoadingUserProfile] = useDocument(
      photo.data().user
    );
    console.log(userProfile?.data())
   
   
    
    return (
      
      <Flex flexDirection={'column'}>
        
        <Flex flexDirection={'row'}>
        <Box> <Avatar src={userProfile?.data().profile_picture} width='50px' height='50px'></Avatar> </Box>
        <Box> {userProfile?.data().name ? userProfile?.data().name : 'User'}</Box> 
        <Box> {userProfile?.data().role ? userProfile?.data().role : 'Roleless'}</Box> 

        </Flex>
        <Flex flexDirection={'column'} onClick={()=> {navigate_photo('/photo/'+photo?.id)}}>
        <img src={photo.data().photo_url}width='300px' height='300px'></img>
        <Box> {photo.data().description ? photo.data().description : ''}</Box>
        </Flex>
        <Flex flexDirection={'column'}>
        <Box>
        Location: {photo.data().location}
        </Box>
        <Box>
        Camera: {photo.data().camera_model ? photo.data().camera_model : 'Unknown'}
        </Box>
        <Box>
          {console.log(photo.data().categories)}
          Category: {photo.data().categories  ? photo.data().categories.join(', ') : 'None'}
        </Box>
        </Flex>
        <Flex flexDirection={'row'} gap={'5'}> <Button > Comments </Button><Button> Emoji </Button><Button> whateverelse </Button></Flex>
        </Flex>
       )
  })} </div>
  }
  else {
    return <div> No photos match the search</div>
  }

}


const PhotoCard = (props: { userPhotos: any; setSearchValue: any}) =>  {
    const {userPhotos, setSearchValue} = props
    // return <div> <PhotoListComponent userPhotos={userPhotos} setSearchValue={setSearchValue}/></div>
    // const navigate = useNavigate();
    const handleInput = (event:any) => setSearchValue(event.target.value)
    return <div><Input onChange={handleInput} placeholder='Search'/>
    <div> <PhotoListComponent userPhotos={userPhotos} setSearchValue={setSearchValue}/></div>
    </div>}


function PhotoListPage() {
  const [user, userLoading] = useAuthState(auth);
  const [signOut, isSigningOut] = useSignOut(auth);
  const usersCollectionRef = collection(db, 'users');
  const [userProfile, loadingUserProfile, errorLoadingUserProfile] = useDocument(
    doc(usersCollectionRef, user?.uid || 'asdf')
  );  
  const [searchValue, setSearchValue] = useState('')
  const usersPhotosCollection = collection(db, 'userPhotos');
  let clause = or(where('location', '==', searchValue), where('categories', 'array-contains', searchValue), where('camera_model', '==', searchValue),where('description', '==', searchValue),where('photo_url', '==', searchValue))
  const [userPhotos, loadingUserPhotos, errorLoadingUserPhotos] = useCollection(
    !searchValue ? query(usersPhotosCollection) : query(usersPhotosCollection, clause)
  );
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <PhotoCard setSearchValue = {setSearchValue} userPhotos={userPhotos}/>
  
  const [isEditing, setEditing] = useState(true);

  const [newName, setNewName] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');
  const [newRole, setNewRole] = useState('');

  const updateUser = async (id: string, newFields: any) => {
    const userDoc = doc(db, 'users', id);
    console.log(newFields);
    await updateDoc(userDoc, newFields);
  };

  const addPhoto = async (id: string, photoUrl: string) => {
    const userPhotosDoc = collection(db, 'users', id, 'photos');
    await addDoc(userPhotosDoc, {photoUrl: photoUrl});
  }

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
      onChange={async (event) => {
        if (event.target.files && event.target.files.length > 0 && event.target.files[0] !== undefined) {
          const imageRef = ref(storage, `profilePhotos/${user?.uid}`);
          console.log(imageRef);
          const imageSnapshot = await uploadBytes(imageRef, event.target.files[0]);
          console.log(imageSnapshot);
          const imageUrl = await getDownloadURL(imageSnapshot.ref);
          console.log(imageUrl);
          setNewProfilePicture(imageUrl);
        }
      }}
      accept="image/png,image/jpeg"
      type="file"
      size="sm"
    />
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
      // updateUser(user.uid, { name: newName, profile_picture: newProfilePicture, role: newRole });
      setEditing(false);
    }}>
    Update User
  </Button></Box>

  } else {
    return <><Stack justify="spaceAround" p={20}><>
    <Wrap>
    <Input placeholder='Search your photo' width="70vh"/>
    <Spacer />
    <Box>
    <Avatar name={userProfile?.data()?.name} src={userProfile?.data()?.profile_picture} width="50px" height="50px" />
    </Box></Wrap>
    
    
    <Flex>
        <Box>
          <Heading>Personal info</Heading>
        </Box>
        <Spacer />
        <Button onClick={() => setEditing(true)}>Edit</Button>
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
        </Flex><Flex justifyContent='center'>
          <Box boxSize='sm'>
            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </Box>
          <Spacer />
          <Box boxSize='sm'>
            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </Box>
          <Spacer />
          <Box boxSize='sm'>
            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
          </Box>
        </Flex>
        </Stack></>
  }
}

export default PhotoListPage;
