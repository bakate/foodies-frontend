import { ChakraProvider } from '@chakra-ui/core';
import React, { Suspense } from 'react';
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query-devtools';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Container from './Chakra/Container';
import Footer from './Chakra/Footer';
import Header from './Chakra/Header';
import DisplayLoader from './Chakra/Spinner';
import customTheme from "./Chakra/theme";
import { useInfos } from './shared/context';
import { openRoutes, protectedRoutes } from './shared/utils/routes';
// const UserRecipes= React.lazy(()=> import('./recipes/pages/UserRecipes'))
// const Auth = React.lazy(() => import('./user/pages/Auth'))
// const UpdateProfile = React.lazy(() => import('./user/pages/UpdateProfile'))
// const ResetPassword = React.lazy(() => import('./user/pages/ResetPassword'))
// const UpdateRecipe = React.lazy(() => import('./recipes/pages/UpdateRecipe'))
// const SingleRecipe = React.lazy(() => import('./recipes/pages/SingleRecipe'))

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
    routes =
      <Switch>
      {protectedRoutes.map((route, i) => (
        <Route exact={route.exact} key={i} path={route.path} component={route.component} />
      ))}

        <Redirect to='/' />
      </Switch>

  } else {
    routes =
      <Switch>
      {openRoutes.map((route, i) => (
        <Route path={route.path} key={i} exact={route.exact} component={route.component} />
      ))}

        <Redirect to='/auth' />
      </Switch>

  }
  return (

    <ReactQueryConfigProvider config={queryConfig}>
    <ChakraProvider resetCSS theme={customTheme}>
        {location.pathname !== "/auth" && <Header />}
        <Container>
          <Suspense
            fallback={
             <DisplayLoader />
            }>
            {routes}
          </Suspense>
        </Container>
        {location.pathname !== "/auth"  && <Footer/>}
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />
     </ReactQueryConfigProvider>
  )
}

export default App
