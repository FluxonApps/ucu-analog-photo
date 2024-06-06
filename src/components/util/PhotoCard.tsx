import { Box, Image, IconButton} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';




export const PhotoCard =(props: { userPhoto: any; photoAuthor: any; }) => {
  const { userPhoto, photoAuthor } = props;
  const { camera_model, description, location, photo_url, user } = userPhoto;
  const { email, role, name, profile_picture} = photoAuthor;
  const navigate = useNavigate();
  console.log(camera_model, description, location, photo_url);
  console.log(email, role, name, profile_picture);

  return <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>

    <IconButton 
      icon={<ArrowBackIcon w={6} h={6} color='00232a' />}
      w={2} h={10} borderRadius='100px' variant='outline' colorScheme='#f0f4f8'
      bg="none"
      onClick={() => { console.log('here'); navigate('/auth'); } } aria-label={''}/>

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

    </Box>
  </Box>
  <Box fontWeight='semibold'>Description: {description ? description : 'No description'}</Box>
  <Box fontWeight='semibold'>Location: {location ? location : 'No location'}</Box>
  <Box fontWeight='semibold'>Camera Model: {camera_model ? camera_model : 'No camera model'}</Box>
  <Box fontWeight='semibold'>Categories: {userPhoto.categories ? userPhoto.categories.map((category: any) => <Box>{category}</Box>) : 'No categories'}</Box>
</Box>
</Box>

}