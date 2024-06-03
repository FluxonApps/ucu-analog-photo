import { Box } from '@chakra-ui/react';
import { FC } from 'react';

const MainLayout: FC<any> = ({ children }) => (
  <Box h="full" bg="radial-gradient(at left top, #050311 20%, #FF00FF 100%)">
    {children}
  </Box>
);

export default MainLayout;
