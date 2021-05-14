import React from 'react';
 import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
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
  firstName: Yup.string().trim()
    .min(1, 'Must be a non-empty value')
    .required('Required'),
  lastName: Yup.string().trim()
    .min(1, 'Must be non-empty value')
    .required('Required'),
  userName: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().trim()
    .min(6, 'Must be at least 6 characters long')
    .required('Required'),
})

function login(userName: string, password: string, navigation: any){
  Fire.auth().signInWithEmailAndPassword(userName, password).then((res)=>{
    storeUserObj(res.user);
    navigation.navigate('Main')
  }).catch((err)=>{
    console.log('nope ',err)
  })
}

async function submitUser(user: User, navigation: any){
  const userId = 'ajsdkfla;jsdflka'// Fire.auth().currentUser?.uid;
  const newUserId = await Fire.auth().createUserWithEmailAndPassword(user.userName, user.password);
  Fire.database().ref(`/users/${userId}/profile`).push(user).then((res)=> {
    login(user.userName, user.password, navigation);
  }).catch((err)=>{
    console.log('couldn\'t do it',err)
  })
}

 export const RegistrationForm = props => (
   <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
    }}
    validationSchema={formValidationSchema}
    onSubmit={values => {
      submitUser(values, props.navigation);
    }}
   >
     {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View>
        <Text style={styles.minorText}>First Name: </Text>
        <TextInput style={styles.input}
          placeholder='First Name'
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          value={values.firstName}
        />
        <Text style={styles.error}>{ touched.firstName && errors.firstName }</Text>
        <Text style={styles.minorText}>Last Name: </Text>
        <TextInput style={styles.input}
          placeholder='Last Name'
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          value={values.lastName}
        />
        <Text style={styles.error}>{ touched.lastName && errors.lastName }</Text>
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
      fontSize: 18,
      marginBottom: 15
  },
  mainText: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
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