import React from 'react';
 import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
 import { Formik } from 'formik';
 import * as Yup from 'yup';
import Fire from '../../environment.config';
import { User } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
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
        <TextInput
          placeholder='First Name'
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          value={values.firstName}
        />
        <Text style={styles.text}>{ touched.firstName && errors.firstName }</Text>
        <TextInput
          placeholder='Last Name'
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          value={values.lastName}
        />
        <Text style={styles.text}>{ touched.lastName && errors.lastName }</Text>
        <TextInput
          placeholder='email@example.com'
          onChangeText={handleChange('userName')}
          onBlur={handleBlur('userName')}
          value={values.userName}
        />
        <Text style={styles.text}>{ touched.userName && errors.userName }</Text>
        <TextInput
          placeholder='Password'
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
        />
        <Text style={styles.text}>{ touched.password && errors.password }</Text>
        <Button onPress={handleSubmit} title="Submit" />
      </View>
     )}
   </Formik>
 );

 const styles = StyleSheet.create({
  text: {
      color: 'red'
  }
})