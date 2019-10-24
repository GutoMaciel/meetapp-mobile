import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import * as Yup from 'yup';
// import Toast from 'react-native-root-toast';

import logo from '../../assets/logo.png';

import Background from '../../components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

// const schema = Yup.object().shape({
//   email: Yup.string()
//     .email('E-mail inválido')
//     .required('O E-mail é obrigatório'),
//   password: Yup.string().required('A Senha é obrigatória'),
// });

// function handleSubmit() {
//   schema
//     .validate({ email, password }, { abortEarly: false })
//     .then(function success() {
//       dispatch(signInRequest(email, password));
//     })
//     .catch(function error(err) {
//       Toast.show(err.errors[0], {
//         duration: Toast.durations.SHORT,
//         position: Toast.positions.BOTTOM,
//         shadow: true,
//         hideOnPress: true,
//         animation: true,
//       });
//     });
// }

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Password"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Access
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Create free account</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
