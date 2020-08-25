import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../shared/components/FormElements/Button'
import { CardStyles } from '../../shared/components/UiElements/Card'
import ErrorMessage from '../../shared/components/UiElements/ErrorMessage'
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner'
import Modal from '../../shared/components/UiElements/Modal'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const RecipeItemStyles = styled(CardStyles)`
  /* padding: 0;*/
  width: 100%;
  padding: 0;
  .info {
    padding: 1rem;
    text-align: center;
  }
  .image {
    width: 100%;
    height: 12.5rem;
    margin-right: 1.5rem;
    transition: ${({ theme }) => theme.mainTransition};
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:hover {
      box-shadow: ${({ theme }) => theme.darkShadow};
      transform: scale(1.05);
    }
  }
  .actions {
    padding: 1rem;
    text-align: center;
    border-top: 1px solid ${({ theme }) => theme.lightGrey};
    button,
    a {
      margin: 0.5rem;
    }
  }

  @media (min-width: 768px) {
    .image {
      height: 25rem;
    }
    .info {
      padding: 0;
    }
  }
`

const RecipeItem = ({ id, title, images, user, onDeleteItem }) => {
  const { userId, token } = useInfos()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  }

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false)
  }
  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`,
      })
      onDeleteItem(id)
    } catch (err) {}
  }

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    )
  }
  if (error) {
    return <ErrorMessage errorMessage={error} onClear={clearError} />
  }

  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Est-ce votre dernier mot ?'
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              annuler
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              confirmer
            </Button>
          </>
        }>
        <p>
          Voulez-vous continuer et supprimer cette recette ? Veuillez noter que cette action est
          irr&eacute;versible.
        </p>
      </Modal>
      <RecipeItemStyles>
        <div className='image'>
          <img src={images.regularImage} alt='recipe' />
        </div>
        <div className='info'>
          <h2>{title}</h2>
        </div>

        <div className='actions'>
          {userId === user && (
            <Button to={`/recipes/${id}`} inverse='true'>
              modifier
            </Button>
          )}
          {userId ? (
            <Button to={`/recipes/recipe/${id}`}>voir</Button>
          ) : (
            <Button to={`/auth`}>s'enregistrer</Button>
          )}

          {userId === user && (
            <Button danger onClick={showDeleteWarningHandler}>
              supprimer
            </Button>
          )}
        </div>
      </RecipeItemStyles>
    </>
  )
}

RecipeItem.propTypes = {
  id: PropTypes.string,
  images: PropTypes.shape({
    regularImage: PropTypes.string,
  }),
  onDeleteItem: PropTypes.func,
  title: PropTypes.string,
  user: PropTypes.string,
}

export default RecipeItem
