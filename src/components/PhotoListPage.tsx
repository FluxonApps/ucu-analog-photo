import { Box, Button, Image, Flex, Heading, Input, HStack, Text, Avatar, Wrap, Spacer } from '@chakra-ui/react';
import { collection, doc, query, where, or } from 'firebase/firestore';
import { useCollection, useDocument, } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';

import { db, storage } from '../../firebase.config';
console.log(storage);
import { useState } from 'react';
import imgUrl from './util/add_comment.png';

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
    return <div>  {userPhotos && userPhotos.docs.map((photo: any) => {
      const navigate_photo = useNavigate();

      console.log(photo.data())
    const [userProfile, loadingUserProfile, errorLoadingUserProfile] = useDocument(
      photo.data().user
    );
    console.log(userProfile?.data())
    const ReactionsObject:any= {
      '😊':0,
      '❤️':0,
      '🗿':0,
      '😱':0
    }
    console.log(Object.keys(ReactionsObject))
    const [reactions, setReactions] = useState(ReactionsObject)
    return (
      
      <Flex flexDirection={'column'} pt="30px" pl="40px" color='#005465' bg='#F1F7F8'>
        
        <Flex flexDirection={'row'}>
        <Box mr="10px" mb="15px"> <Avatar src={userProfile?.data().profile_picture} width='50px' height='50px'></Avatar> </Box>
        <Box> <Heading size='md' color="#00232A" fontSize="20px"> {userProfile?.data().name ? userProfile?.data().name : 'User'}</Heading>
        <Text color='#005465' fontSize="16px">{userProfile?.data().role ? userProfile?.data().role : 'Roleless'}</Text></Box> 

        </Flex>
        <Flex flexDirection={'column'} onClick={()=> {navigate_photo('/photo/'+photo?.id)}}>
        <Box mb='15px'><img src={photo.data().photo_url}width='400px' height='350px'></img></Box>
        <Box> {photo.data().description ? photo.data().description : ''}</Box>
        </Flex>
        <Flex flexDirection={'column'}>
        <Box>
        Location: {photo.data().location}
        </Box>
        <Box>
        Camera: {photo.data().camera_model ? photo.data().camera_model : 'Unknown'}
        </Box>
        <HStack spacing='10px' mt="10px" mb='10px'>
          {console.log(photo.data().categories)}
          {photo.data().categories && photo.data().categories.map((category: any) => (<Text 
          color='#005465' bg='#C6EFF6' borderRadius='10px' px='15px' py='5px' fontWeight="medium" marginRight="5px">
          {category}</Text>))}
        </HStack>
        </Flex>
        <Flex flexDirection={'row'} gap={'3'}> <Button bg='' _hover={{bg:'#C6EFF6'}}><Image src={imgUrl} alt="Add comment" width="30px"></Image> </Button>
        <HStack>
          {Object.keys(reactions).map((key)=> (
            <Button onClick={()=> {console.log(reactions); setReactions((prevReactions: { [x: string]: number; }) => ({...prevReactions, [key]: prevReactions[key]+1}))}}color='#005465' bg='#C6EFF6' borderRadius='10px' px='15px' py='7px' fontWeight="medium" border='2px solid #005465' marginRight="5px" >{key}{reactions[key]}</Button>
          ))}
      </HStack></Flex>
        </Flex>
       )
  })} </div>
  }
  else {
    return <div> No photos match the search</div>
  }

}


const PhotoCard = (props: { userPhotos: any; setSearchValue: any; userProfile: any }) =>  {
    const {userPhotos, setSearchValue, userProfile} = props
    // return <div> <PhotoListComponent userPhotos={userPhotos} setSearchValue={setSearchValue}/></div>
    const navigate = useNavigate();
    const handleInput = (event:any) => setSearchValue(event.target.value)
    return <div>
    <Wrap>
    <Flex bg="#F1F7F8"><Input onChange={handleInput} placeholder='Search'  width="70vh" bg='#bee8f0' borderRadius='30px' mt="30px" ml="30px"/></Flex>
    <Spacer/>
    <Avatar name={userProfile?.data().name} src={userProfile?.data().profile_picture} width="60px" height="60px" onClick={() => navigate('/profile')}></Avatar>
    </Wrap>

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
  return <PhotoCard setSearchValue = {setSearchValue} userPhotos={userPhotos} userProfile={userProfile}/>
}

export default PhotoListPage;
