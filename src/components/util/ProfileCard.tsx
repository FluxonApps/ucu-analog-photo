import { Box, Button, Image, Flex, Heading, Input, Stack, HStack, Spinner, Text, Avatar, RadioGroup, Radio, Wrap, WrapItem, Center, Spacer, InputLeftElement, InputGroup} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const ProfileCard =(props: { userData: any; setEditing: any; }) => {
    console.log(props)
const { userData, setEditing } = props;
const navigate = useNavigate();
return <><Stack justify="spaceAround" px={40} py={10} spacing='15' backgroundColor='#f1f7f8' minHeight='100vh' color='00232a'><>
<Wrap>
<Input placeholder='Search your photo' width="70vh" bg='#bee8f0' borderRadius='30px'/>
<Spacer />
<Box>
<Avatar name={userData.name} src={userData.profile_picture} width="40px" height="40px" />
</Box></Wrap>


<Flex>
    <Box>
      <Heading>Personal info</Heading>
    </Box>
    <Spacer />
    <Button onClick={() => setEditing(true)} bg='#62daf2' borderRadius='50px' color='00232a'>Edit</Button>
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

    <Button
        height='300px'
        width='300px'
        border='2px'
        borderColor='blue.500'
        borderRadius='0px'
        onClick={() => navigate('/add_photo')}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
      </svg>
      </Button>
      <Spacer />
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