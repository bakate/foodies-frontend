import { ChakraProvider } from '@chakra-ui/core';
import React, { Suspense } from 'react';
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query-devtools';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Container from './Chakra/Container';
import Header from './Chakra/Header';
import DisplayLoader from './Chakra/Spinner';
import customTheme from "./Chakra/theme";
import AllRecipes from './recipes/pages/AllRecipes';
import { useInfos } from './shared/context';
const UserRecipes= React.lazy(()=> import('./recipes/pages/UserRecipes'))
const Auth = React.lazy(() => import('./user/pages/Auth'))
const UpdateProfile = React.lazy(() => import('./user/pages/UpdateProfile'))
const ResetPassword = React.lazy(() => import('./user/pages/ResetPassword'))
const UpdateRecipe = React.lazy(() => import('./recipes/pages/UpdateRecipe'))
const SingleRecipe = React.lazy(() => import('./recipes/pages/SingleRecipe'))

function App() {
  const location = useLocation()
  const queryConfig = {
    queries: {
       staleTime: 50_000,
      cacheTime: 1_000_000,
      retry: false,
    }
  };
  const { token } = useInfos()
  let routes
  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <AllRecipes />
        </Route>
        <Route path='/:userId/recipes' exact>
          <UserRecipes />
        </Route>
        <Route path='/profile/:userId' exact>
          <UpdateProfile />
        </Route>
        <Route path='/recipes/recipe/:recipeId' exact>
          <SingleRecipe />
        </Route>
        <Route path='/recipes/:recipeId' exact>
          <UpdateRecipe />
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <AllRecipes />
        </Route>
        <Route path='/recipes/recipe/:recipeId' exact>
          <SingleRecipe />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Route path='/resetpassword/:token' exact>
          <ResetPassword />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    )
  }

  return (

    <ReactQueryConfigProvider config={queryConfig}>
    <ChakraProvider resetCSS theme={customTheme}>
      {location.pathname !== "/auth"?  <Header />: null}
        <Container>
          <Suspense
            fallback={
             <DisplayLoader />
            }>
            {routes}
          </Suspense>
        </Container>
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />
     </ReactQueryConfigProvider>
  )
}

export default App
