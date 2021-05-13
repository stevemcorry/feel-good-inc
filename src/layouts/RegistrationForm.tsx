import React from 'react';
 import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
 import { Formik } from 'formik';
 import * as Yup from 'yup';

 const formValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim()
    .min(1, 'Must be a non-empty value')
    .required('Required'),
  lastName: Yup.string().trim()
    .min(1, 'Must be non-empty value')
    .required('Required'),
  userName: Yup.string().email('Invalid email address').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().trim()
    .min(1, 'Must be non-empty value')
    .required('Required'),
})
 
 export const RegistrationForm = props => (
   <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
    }}
    validationSchema={formValidationSchema}
    onSubmit={values => console.log(values)}
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
        <TextInput
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          placeholder='email address'
        />
        <Text style={styles.text}>{ touched.email && errors.email }</Text>
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