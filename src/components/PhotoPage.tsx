import { Spinner } from '@chakra-ui/react';
import { collection, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useParams } from 'react-router-dom';
import { db } from '../../firebase.config';
import { PhotoCard } from './util/PhotoCard';

const auth = getAuth();

export function PhotoPage() {
  const [user, userLoading] = useAuthState(auth);  
  let { imageId } = useParams();
  console.log('imageId:', imageId);
  const [userPhoto, loadingUserPhoto] = useDocument(doc(db, 'userPhotos', imageId || 'abc'));
  console.log('userPhoto data:', userPhoto?.data());
  const [photoAuthor, loadingPhotoAuthor] = useDocument(userPhoto?.data()?.user);
  const [userProfile, loadingUserProfile] = useDocument(
    doc(collection(db, 'users'), user?.uid || 'asdf')
  );

  if (!imageId && !userPhoto && !photoAuthor) {
    return <div>Error: No image ID provided</div>;
  }
  // console.log(photoAuthor);


  // Do not show page content until auth state is fetched.
  if (userLoading || loadingUserPhoto || loadingPhotoAuthor || !userPhoto || !photoAuthor || !userProfile) {
    return <Spinner />;
  }
  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <PhotoCard userData={userProfile?.data()} userPhoto={userPhoto?.data()} photoAuthor={photoAuthor?.data()}></PhotoCard>
}

export default PhotoPage;
