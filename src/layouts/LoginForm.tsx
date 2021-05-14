import React from 'react';
import { Button, TextInput, View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Fire from '../../environment.config';
import { User } from '../interfaces/user.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserObj = async (value: object) => {
  try {
    const jsonObj = JSON.stringify(value);
    // console.log(jsonObj)
    await AsyncStorage.setItem('@userObj', jsonObj)
    // await AsyncStorage.setItem('@userObj', value)
  } catch (err) {
    console.log('storeUserObj: %s', err);
  }
}

 const formValidationSchema = Yup.object().shape({
  userName: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().trim()
    .min(1, 'Must be non-empty value')
    .required('Required'),
})

function login(userName: string, password: string, navigation: any){
  Fire.auth().setPersistence('local').then(()=>{
    Fire.auth().signInWithEmailAndPassword(userName, password).then((res)=>{
      // console.log(res.user);
      storeUserObj(res.user);
      navigation.navigate('Main')
      
    }).catch((err)=>{
      console.log('nope ',err)
    })
  })
}

 export const LoginForm = props => (

  <Formik
    initialValues={{
      userName: '',
      password: '',
    }}
    validationSchema={formValidationSchema}
    onSubmit={user => {
      login(user.userName, user.password, props.navigation);
    }}
    >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (    
    <View>
      <Text style={styles.minorText}>Username: </Text>
      <TextInput style={styles.input}
        placeholder='email@example.com'
        onChangeText={handleChange('userName')}
        onBlur={handleBlur('userName')}
        value={values.userName}
      />
      <Text style={styles.error}>{ touched.userName && errors.userName }</Text>
      <Text style={styles.minorText}>Password: </Text>
      <TextInput style={styles.input}
        placeholder='Password'
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
      />
      <Text style={styles.error}>{ touched.password && errors.password }</Text>
      <Button onPress={handleSubmit} title="Submit" />
    </View>
    )}
  </Formik>
 );

 const styles = StyleSheet.create({
  error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 15,
      fontSize: 18,
  },
  mainText: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  minorText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center'
 },
})