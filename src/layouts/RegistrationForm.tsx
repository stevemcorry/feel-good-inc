import React from 'react';
 import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
 import { Formik } from 'formik';
 import * as Yup from 'yup';
import Fire from '../../environment.config';
import { User } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

 const formValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim()
    .min(1, 'Must be a non-empty value')
    .required('Required'),
  lastName: Yup.string().trim()
    .min(1, 'Must be non-empty value')
    .required('Required'),
  userName: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().trim()
    .min(1, 'Must be non-empty value')
    .required('Required'),
})

function submitUser(user: User){
  console.log(user);
  const userId = 'ajsdkfla;jsdflka'// Fire.auth().currentUser?.uid;
  Fire.database().ref(`/users/${userId}/profile`).push(user)
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
      
      submitUser(values);
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