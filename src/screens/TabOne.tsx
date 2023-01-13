import { FC } from 'react'
import styled from 'styled-components/native'
import { Icon, IconEnum } from '../components/icons/Icons'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { selectCount, updatedCount } from '../state/data'
import { persistor } from '../state/store'

export const TabOne: FC = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  return (
    <Container>
      <CountText>{count}</CountText>
      <ButtonContainer>
        <StyledButton onPress={() => dispatch(updatedCount(count + 1))}>
          <Icon icon={IconEnum.plus} />
        </StyledButton>
        <StyledButton onPress={() => dispatch(updatedCount(count - 1))}>
          <Icon icon={IconEnum.minus} />
        </StyledButton>
      </ButtonContainer>
      <StyledText onPress={async () => await persistor.purge()}>Press here to reset state</StyledText>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: white;
`
const CountText = styled.Text`
  font-size: 44px;
`

const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
`

const StyledButton = styled.TouchableOpacity`
  background: pink;
  padding: 15px;
  width: 47%;
  align-items: center;
`

const StyledText = styled.Text`
  font-size: 14px;
  margin-top: 20px;
  font-weight: bold;
`
