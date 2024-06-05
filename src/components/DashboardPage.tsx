import { Box, Button, Input, Spinner, Tag, Text } from '@chakra-ui/react';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

const auth = getAuth();

const DashboardPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [signOut, isSigningOut] = useSignOut(auth);
  
  const [isShowingNewCategoryInput, showCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const [categoryList, setCategoryList] = useState(['Category1', 'Category2']);

  // Do not show page content until auth state is fetched.
  if (userLoading) {
    return <Spinner />;
  }

  // If user isn't signed in, redirect to auth page.
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  

  return (
    <Box p={6}>
      { isShowingNewCategoryInput ?
        <Box><Input
        onChange={(event) => {
          setNewCategory(event.target.value);
        }}
        placeholder="Name..."
        size="sm"
      />
      <Button onClick={() => {
        const newCategoryList = [newCategory, ...categoryList];
        if (newCategory && newCategoryList.length < 4) {
          setCategoryList(newCategoryList)
        }
        showCategoryInput(false)
        }}>+</Button></Box>
      :

      <Button onClick={() => { showCategoryInput(true) }}>+</Button>

      }

      <Box p={6}>{categoryList.map((category) => <Tag m={6}>{category}</Tag>)}</Box>

      <Button onClick={signOut} isDisabled={isSigningOut} isLoading={isSigningOut}>
        Sign out
      </Button>
    </Box>
  );
};

export default DashboardPage;
