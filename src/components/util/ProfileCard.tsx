import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Spacer, InputLeftElement, InputGroup, IconButton} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Auth, getAuth } from 'firebase/auth';
import { AddIcon } from '@chakra-ui/icons';
import { useCollection, useDocument, } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import { collection, or, query, where } from '@firebase/firestore';
import { db, storage } from '../../../firebase.config';

const auth = getAuth();
export const ProfileCard =(props: { userData: any;}) => {
    console.log(props)
const { userData } = props;
const navigate = useNavigate();
const [signOut, isSigningOut] = useSignOut(auth);
const [searchValue, setSearchValue] = useState('')
const usersPhotosCollection = collection(db, 'userPhotos');
const [userPhotos, loadingUserPhotos, errorLoadingUserPhotos] = useCollection(
  !searchValue ? query(usersPhotosCollection) : query(usersPhotosCollection, 
    or(
      where('location', '==', searchValue), 
      where('camera_model', '==', searchValue),
      where('description', '==', searchValue),
      where('photo_url', '==', searchValue))),
);

return <><Stack justify="spaceAround" px={40} py={10} spacing='15' backgroundColor='#f1f7f8' minHeight='100vh' color='00232a'><>
<Wrap>
<Box marginRight="10px">
  <Image src="src/components/util/png_logo.png" alt="Logo" width="45px" height="auto" />
</Box>
<Input placeholder='Search your photo' width="70vh" bg='#bee8f0' borderRadius='30px'/>
<Spacer/>
<Box>
<Avatar name={userData.name} src={userData.profile_picture} width="40px" height="40px" />
</Box>
</Wrap>
<Flex>
    <Box>
      <Heading>Personal info</Heading>
    </Box>
    <Spacer />
    <Wrap spacing="10px">
    <Button onClick={() => navigate('/edit_profile')} bg='#62daf2' borderRadius='50px' color='00232a'>Edit</Button>
    <Button onClick={signOut} isDisabled={isSigningOut} isLoading={isSigningOut} bg='#62daf2' borderRadius='50px' color='00232a'>Sign out</Button>
    </Wrap>
  </Flex><Flex>
  <HStack spacing='60px' justify='center'>
      
      <Box>
        <Avatar name={userData.name} src={userData.profile_picture} width="100px" height="100px" />
      </Box>
      
      <Box>
        <Heading>{userData.name}</Heading>
        <Text>{userData.email}</Text>
        {userData.role && (
        <Box as='button' borderRadius='60px' bg='#bee8f0' px={3} h={6}>
          {userData.role}
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

    <IconButton
        icon={<AddIcon w={6} h={6} color='00232a' />}
        h='300px'
        w='300px'
        border='2px'
        borderColor='blue.500'
        borderRadius='0px'
        onClick={() => navigate('/add_photo')}
        aria-label='Add Bottom'
        
      >
      </IconButton>
      <Spacer />
    
      {loadingUserPhotos ? <Spinner /> : 
            (userPhotos && userPhotos.docs.map((photo: any) => {
                const photoData = photo.data();
                return (
                    <Box key={photo.id} boxSize='sm'>
                        <Image src={photoData.photo_url} alt='User Photo' />
                    </Box>
                );
            }))
        }
      </Flex>
    </Stack></>
    }
