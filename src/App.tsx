import { HStack, Img, Link, Stack, Text } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import fluxonLogo from './assets/fluxon-logo.svg';
import AuthPage from './components/AuthPage.tsx';
import DashboardPage from './components/DashboardPage.tsx';
import FirebaseDemo from './components/FirebaseDemo.tsx';
import MainLayout from './components/layout/MainLayout.tsx';
import ProfilePage from './components/ProfilePage.tsx';
import PhotoListPage from './components/PhotoListPage.tsx';
import AddPhotoPage from './components/AddPhotoPage.tsx';
import PhotoPage from './components/PhotoPage.tsx';
import EditProfilePage from './components/EditProfilePage.tsx';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PhotoListPage />} />
      <Route path="/firebase-demo" element={<FirebaseDemo />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/photolist" element={<PhotoListPage />} />
      <Route path="/add_photo" element={<AddPhotoPage />} />
      <Route path=":imageId" element={<PhotoPage />} />
      <Route path="/edit_profile" element={<EditProfilePage />} />
    </Routes>
  );
};

const EventPage = () => {
  return (
    <MainLayout>
      <Stack spacing={4} justifyContent="center" alignItems="center" h="full">
        <Link target="_blank" href="https://fluxon.com">
          <Img w={300} src={"https://www.usatoday.com/gcdn/presto/2019/08/16/USAT/bd6538e4-5535-41ce-857b-518451c3a958-Snapchat_Logo_H.png"} />
        </Link>
        <Text color="white">Snapchat</Text>
        <HStack mt={4} color="blue.100">
          <Link href="/firebase-demo">Firebase demo</Link>
          <Text>|</Text>
          <Link href="/auth">Authenticate</Link>
        </HStack>
      </Stack>
    </MainLayout>
  );
};
