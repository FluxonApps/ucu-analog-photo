import { Spinner } from '@chakra-ui/react';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useParams } from 'react-router-dom';
import { db } from '../../firebase.config';
import { PhotoCard } from './util/PhotoCard';

const auth = getAuth();

export function ProfilePage() {
  const [user, userLoading] = useAuthState(auth);  
  let { imageId } = useParams();
  console.log('imageId:', imageId);
  const [userPhoto, loadingUserPhoto] = useDocument(doc(db, 'userPhotos', imageId || 'abc'));
  console.log('userPhoto data:', userPhoto?.data());
  // console.log(userPhoto);
  const [photoAuthor, loadingPhotoAuthor] = useDocument(doc(db, 'users', userPhoto?.data()?.user || 'abc'));


  if (!imageId && !userPhoto && !photoAuthor) {
    return <div>Error: No image ID provided</div>;
  }
  // console.log(photoAuthor);


  // Do not show page content until auth state is fetched.
  if (userLoading || loadingUserPhoto || loadingPhotoAuthor || !userPhoto || !photoAuthor) {
    return <Spinner />;
  }
  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }


  return <PhotoCard userPhoto={userPhoto?.data()} photoAuthor={photoAuthor?.data()}></PhotoCard>
}

export default ProfilePage;
