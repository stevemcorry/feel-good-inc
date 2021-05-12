import { Formik } from "formik";
import React from "react";
import { StyleSheet, Button, Text, View, TextInput } from "react-native";
import { Errors } from "../interfaces/errors.interface";
import * as Yup from 'yup';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default function RegistrationScreen({ navigation }) {
  const validate = values => {
    const errors: Errors = {};

    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    else if (values.firstName.trim().length < 1) {
      errors.firstName = 'Must be a non-empty value';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.trim().length < 1) {
      errors.lastName = 'Must be a non-empty value';
    }
  
    if (!values.userName) {
      errors.userName = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.userName = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.trim().length < 1) {
      errors.password = 'Must be a non-empty value';
    }
  
    return errors;
  };  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Please Fill Out The Following:</Text>
      <Formik 
        initialValues={{
          firstName: '',
          lastName: '',
          userName: '',
          password: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().trim()
            .min(1, 'Must be a non-empty value')
            .required('Required'),
          lastName: Yup.string().trim()
            .max(1, 'Must be non-empty value')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().trim()
            .max(1, 'Must be non-empty value')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values, null, 2));
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(props) => (
        <View>    
          <TextInput style={[s.text]}
            placeholder='First Name'
            onChangeText={props.handleChange('firstName')}
            onBlur={props.handleBlur('firstName')}
            value={props.values.firstName}
         />
         <TextInput style={[s.text]}
            placeholder='Last Name'
            onChangeText={props.handleChange('lastName')}
            onBlur={props.handleBlur('lastName')}
            value={props.values.lastName}
         />
         <TextInput style={[s.text]}
            placeholder='Username'
            onChangeText={props.handleChange('userName')}
            onBlur={props.handleBlur('userName')}
            value={props.values.userName}
         />
         <TextInput style={[s.text]}
            placeholder='Password'
            onChangeText={props.handleChange('password')}
            onBlur={props.handleBlur('password')}
            value={props.values.password}
         />
          <Button title='Submit' onPress={() => console.log(props.handleSubmit())}/>
        </View>
        )}
      </Formik>
    </View>
  );
}