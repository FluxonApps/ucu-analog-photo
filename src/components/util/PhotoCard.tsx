import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Spacer, InputLeftElement, InputGroup} from '@chakra-ui/react';
import { useDocument } from 'react-firebase-hooks/firestore';
// import { useNavigate } from 'react-router-dom';



export const PhotoCard =(props: { userData: any, userPhoto: any; photoAuthor: any; }) => {
  const { userData, userPhoto, photoAuthor } = props;
  const { camera_model, description, location, photo_url, user } = userPhoto;
  const { email, role, name, profile_picture} = photoAuthor;
  const navigate = useNavigate();
  // <Box fontWeight='semibold'>Categories: {userPhoto.categories ? userPhoto.categories.map((category: any) => <Box>{category}</Box>) : 'No categories'}</Box>
  return (
    <Box overflow='hidden' p='30px' backgroundColor="#f1f7f8" color="00232a">
      <Button onClick={() => navigate('/') } fontSize='24px' fontWeight="bold" margin='10px' variant='ghost' borderRadius='100px' border='2px solid #005465' _hover={{ bg: '#C6EFF6' }}>←</Button>
      <Flex alignItems='center' p='20px'>
        <Avatar src={profile_picture} maxWidth="75px"/>
        <Box ml='20px'>
          <Heading size='md' color="#00232A" fontSize="24px">{name}</Heading>
          <Text color='#005465'>{role}</Text>
        </Box>
      </Flex>
      <Box p="10px" maxW={555}>
        <Image src={photo_url} alt='image' />
      </Box>
      <Box p='10px' color="#005465" fontWeight="medium">
        <Text>{description || 'Description (optional)'}</Text>
        <Text>{location || 'Location (optional)'}</Text>
        <Text>{camera_model || 'Camera (optional)'}</Text>
      </Box>
      <HStack spacing='10px' p='10px'>
        <Text color='#005465' bg='#C6EFF6' borderRadius='10px' px='15px' py='5px' fontWeight="medium" marginRight="5px">Traveling</Text>
        <Text color='#005465' bg='#C6EFF6' borderRadius='10px' px='15px' py='5px' fontWeight="medium">Nature</Text>
      </HStack>
      <HStack p='10px'>
        <Text color='#005465' bg='#C6EFF6' borderRadius='10px' px='15px' py='7px' fontWeight="medium" border='2px solid #005465' marginRight="5px">😊 13</Text>
        <Text color='#005465' bg='#C6EFF6' borderRadius='10px' px='15px' py='7px' fontWeight="medium" border='2px solid #005465' >❤️ 25</Text>
      </HStack>
      <Flex p='10px' alignItems='center'>
        <Avatar src={userData.profile_picture} size='sm' />
        <InputGroup ml='10px'>
          <Input type='text' color='#00232a' placeholder='Write a comment...' bg='#C6EFF6' maxWidth="700px" height="50px"/>
        </InputGroup>
      </Flex>
    </Box>
  );
};
