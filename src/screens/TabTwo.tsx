import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { Icon, IconEnum } from '../components/icons/Icons'
import { Text } from '../components/Themed'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getMeals, selectMeals } from '../state/data'
import { selectMealsRequestState } from '../state/request'

export const TabTwo: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const meals = useAppSelector(selectMeals)
  const mealRequestStatus = useAppSelector(selectMealsRequestState)

  useEffect(() => {
    dispatch(getMeals())
  }, [dispatch])

  return (
    <Container>
      <Text>i18n: {t('Welcome')}</Text>
      <StyledButton onPress={() => dispatch(getMeals())}>
        <Text>Fetch meals</Text>
        <Icon icon={IconEnum.heart} />
      </StyledButton>
      <Text>{mealRequestStatus}</Text>

      {meals && meals.map((meal, index) => <Text key={index}>{meal.title}</Text>)}
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: #3b89ff;
`

const StyledButton = styled.TouchableOpacity`
  background: pink;
  padding: 15px;
  width: 47%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: 15px;
`
