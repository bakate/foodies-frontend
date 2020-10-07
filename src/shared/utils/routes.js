import React from 'react'
import AllRecipes from '../../recipes/pages/AllRecipes'
import SingleRecipe from '../../recipes/pages/SingleRecipe'
import UserRecipes from '../../recipes/pages/UserRecipes'
import Auth from '../../user/pages/Auth'
import ResetPassword from '../../user/pages/ResetPassword'
import UpdateProfile from '../../user/pages/UpdateProfile'

const protectedRoutes = [
  {
    path: '/',
    exact: true,
    component: () => <AllRecipes />,
  },
  {
    path: "'/:userId/recipes'",
    exact: true,
    component: () => <UserRecipes />,
  },
  {
    path: '/profile/:userId',
    exact: true,
    component: () => <UpdateProfile />,
  },
  {
    path: '/recipes/recipe/:recipeId',
    exact: true,
    component: () => <SingleRecipe />,
  },
  {
    path: '/recipes/:recipeId',
    exact: true,
    component: () => <UpdateProfile />,
  },
]

const openRoutes = [
  {
    path: '/',
    exact: true,
    component: () => <AllRecipes />,
  },
  {
    path: '/recipes/recipe/:recipeId',
    exact: true,
    component: () => <SingleRecipe />,
  },
  {
    path: '/auth',
    exact: true,
    component: () => <Auth />,
  },
  {
    path: '/resetpassword/:token',
    exact: true,
    component: () => <ResetPassword />,
  },
]

export { protectedRoutes, openRoutes }

