import { Formik } from "formik";
import React from "react";
import { StyleSheet, Button, Text, View, TextInput } from "react-native";
import { Errors } from "../interfaces/errors.interface";
import * as Yup from 'yup';
import { RegistrationForm } from "../layouts/RegistrationForm";

export default function RegistrationScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>Please Fill Out The Following:</Text>
       <View>
        <RegistrationForm navigation={navigation}/>
       </View>
    </View>
  );
}