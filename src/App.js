import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, Inner, StyledPage, theme } from './shared/components/GlobalStyles'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import LoadingSpinner from './shared/components/UiElements/LoadingSpinner'
import { useInfos } from './shared/context'
import Users from './user/pages/Users'
const UserRecipes= React.lazy(()=> import('./recipes/pages/UserRecipes'))
const Auth = React.lazy(() => import('./user/pages/Auth'))
const ResetToken = React.lazy(() => import('./user/pages/ResetToken'))
const UpdateProfile = React.lazy(() => import('./user/pages/UpdateProfile'))
const Reset = React.lazy(() => import('./user/pages/Reset'))
const NewRecipe= React.lazy(() => import('./recipes/pages/NewRecipe'))
const UpdateRecipe = React.lazy(() => import('./recipes/pages/UpdateRecipe'))
const SingleRecipe = React.lazy(() => import('./recipes/pages/SingleRecipe'))

function App() {
  const { token } = useInfos()
  let routes
  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/recipes' exact>
          <UserRecipes />
        </Route>
        <Route path='/recipes/new' exact>
          <NewRecipe />
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
          <Users />
        </Route>

        <Route path='/:userId/recipes' exact>
          <UserRecipes />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>

        <Route path='/reset' exact>
          <ResetToken />
        </Route>
        <Route path='/reset/:token' exact>
          <Reset />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledPage>
        <MainNavigation />
        <Inner>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }>
            {routes}
          </Suspense>
        </Inner>
      </StyledPage>
    </ThemeProvider>
  )
}

export default App
