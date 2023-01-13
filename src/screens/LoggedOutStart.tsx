import { FC } from 'react'
import styled from 'styled-components/native'
import { useAppDispatch } from '../hooks/hooks'
import { retrievedUser, User } from '../state/user'

export const validUser: User = {
  uid: '123',
  points: 0,
  email: 'berry@hackberry.se',
  nickname: 'berry',
  region: 'sweden',
}

export const LoggedOutStartScreen: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <Container>
      <CountText>LoggedOut</CountText>
      <ButtonContainer>
        <StyledButton onPress={() => dispatch(retrievedUser(validUser))}>
          <CountText>Sign in</CountText>
        </StyledButton>
      </ButtonContainer>
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
