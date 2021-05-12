import { useFormik } from "formik";
import React from "react";
import { Button, Text, View } from "react-native";
import { Errors } from "../interfaces/errors.interface";

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

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        id="firstName"
        name="firstName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

      <label htmlFor="firstName">First Name:</label>
      <input
        id="lastName"
        name="lastName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

      <label htmlFor="userName">Username:</label>
      <input
        id="userName"
        name="userName"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.userName}
      />
      {formik.touched.userName && formik.errors.userName ? <div>{formik.errors.userName}</div> : null}

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.firstName ? <div>{formik.errors.password}</div> : null}

      <button type="submit">Submit</button>
    </form>
  );
}