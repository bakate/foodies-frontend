import { Button, ButtonGroup, Progress } from '@chakra-ui/core'
import cogoToast from 'cogo-toast'
import { Field, Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import InputField from '../../Chakra/InputField'
import SimpleModal from '../../Chakra/SimpleModal'
import ImageHandler from '../../shared/components/FormElements/ImageHandler'
import { useInfos } from '../../shared/context'
import { useHttpClient } from '../../shared/hooks/http-hook'

const DisplayModal = ({ isOpen, onClose }) => {
  const initialValues = () => {
    return {
      title: 'yaourt au riz',
      images: null,
      ingredients: 'du riz',
      cooking: '15 min au four',
      category: 'plat principal',
      difficulty: 'facile',
      duration: '45',
    }
  }

  const history = useHistory()
  const { token } = useInfos()
  const [currentStep, setCurrentStep] = useState(1)

  const next = () => {
    let upgradeStep = currentStep >= 2 ? setCurrentStep(3) : setCurrentStep(currentStep + 1)
    return upgradeStep
  }
  const prev = () => {
    let downgrade = currentStep <= 1 ? setCurrentStep(1) : setCurrentStep(currentStep - 1)
    return downgrade
  }
  const { sendRequest } = useHttpClient()
  const initialRef = useRef()

  const ProgressBar = () => {
    return (
      <Progress
        value={currentStep === 1 ? '33' : currentStep === 2 ? '66' : '100'}
        size='sm'
        colorScheme={currentStep !== 3 ? 'orange' : 'blue'}
      />
    )
  }

  const StepToDisplay = () => {
    if (currentStep === 1) {
      return (
        <>
          <InputField name='title' placeholder='titre de la recette' label='Titre' />
          <InputField
            name='duration'
            type='number'
            placeholder='durée de la recette'
            label='Temps (minutes)'
          />
          <InputField
            name='category'
            label='Catégorie'
            element='select'
            items={['entrée', 'plat principal', 'aperitif et buffet', 'dessert']}
          />
          <InputField
            name='difficulty'
            label='Difficult&eacute;'
            element='select'
            items={['facile', 'moyen', 'difficile']}
          />
        </>
      )
    }
    if (currentStep === 2) {
      return (
        <>
          <InputField
            name='ingredients'
            placeholder='ingrédients'
            label='Ingr&eacute;dients'
            element='textarea'
          />
          <InputField name='cooking' label='Pr&eacute;paration' element='textarea' />
        </>
      )
    }
    if (currentStep === 3) {
      return (
        <>
          <Field as={ImageHandler} id='images' name='images' />
        </>
      )
    }
  }
  const ModalFooterToDisplay = ({ isSubmitting }) => {
    return (
      <ButtonGroup>
        {currentStep === 3 && (
          <Button
            type='submit'
            colorScheme='blue'
            mr={3}
            isLoading={isSubmitting}
            loadingText='En Cours ...'>
            valider
          </Button>
        )}
        {currentStep !== 1 && <Button onClick={() => prev()}>Précédent</Button>}
        <Button onClick={onClose}>Cancel</Button>
        {currentStep !== 3 && (
          <Button onClick={() => next()} ref={initialRef}>
            Suivant
          </Button>
        )}
      </ButtonGroup>
    )
  }
  return (
    <>
      <Formik
        initialValues={initialValues()}
        validationSchema={Yup.object({
          title: Yup.string().required('Fournissez un titre valide'),
          images: Yup.object().required('Selectionnez une belle image.'),
          ingredients: Yup.string().required('Renseignez les ingrédients'),
          cooking: Yup.string().required('Donnez quelques conseils de préparation'),
          category: Yup.string().oneOf(
            ['entrée', 'plat principal', 'aperitif et buffet', 'dessert'],
            'Choix invalide'
          ),
          difficulty: Yup.string().oneOf(['facile', 'moyen', 'difficile'], 'Choix invalide'),
          duration: Yup.number().required('Renseignez la durée'),
        })}
        onSubmit={async ({
          title,
          images,
          ingredients,
          cooking,
          category,
          difficulty,
          duration,
        }) => {
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/recipes`,
              'POST',
              JSON.stringify({
                title,
                images,
                ingredients,
                cooking,
                category,
                difficulty,
                duration,
              }),
              {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              }
            )
            cogoToast.success('Super pour la nouvelle recette !')
            history.go()
            onClose()
          } catch (err) {}
        }}>
        {({ isSubmitting }) => (
          <SimpleModal
            isOpen={isOpen}
            initialRef={initialRef}
            onClose={onClose}
            progressBar={ProgressBar}
            modalHeader='Cr&eacute;er votre Recette'
            modalBody={StepToDisplay()}
            modalFooter={ModalFooterToDisplay(isSubmitting)}
          />
        )}
      </Formik>
    </>
  )
}

export default DisplayModal
