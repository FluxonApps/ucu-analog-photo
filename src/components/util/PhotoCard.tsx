import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Spacer, InputLeftElement, InputGroup} from '@chakra-ui/react';
import { useDocument } from 'react-firebase-hooks/firestore';

//
//


export const PhotoCard =(props: { userData: any; userPhoto: any; photoAuthor: any; }) => {
  const { userData, userPhoto, photoAuthor } = props;
  const { camera_model, description, location, photo_url, user } = userPhoto;
  const { email, role, name, profile_picture} = photoAuthor;
  console.log(camera_model, description, location, photo_url);
  console.log(email, role, name, profile_picture);

  return <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
  <Image src={photo_url} />

  <Box p='6'>
    <Box display='flex' alignItems='baseline'>
      
    <Box
      mt='1'
      fontWeight='semibold'
      as='h4'
      lineHeight='tight'
      noOfLines={1}
    >
      {location}
    </Box>
  </Box>
</Box>
</Box>

}