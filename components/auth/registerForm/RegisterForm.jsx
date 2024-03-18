import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import { Button, Text, TextInput, View } from "react-native";
import styles from "./RegisterForm.style";
import useAuthCalls from "../../../hooks/useAuthCalls";

const RegisterForm = ({navigation}) => {
    const { register } = useAuthCalls(navigation);
    const registerSchema = object({
      email: string().email().required("Email is required"),
      password: string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters.")
        .max(16, "Password must be at least 16 characters")
        .matches(/\d+/, "Password must contain number.")
        .matches(/[a-z]/, "Password must contain lowercase letter.")
        .matches(/[A-Z]/, "Password must contain uppercase letter.")
        .matches(/[*!,?{}><%&$#£+-.]+/, "Password must contain custom character."),
      username: string().required("Username is required."),
    });
  
    return (
      
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(values, action) => {
            register({ ...values, password2: values.password });
            // console.log(values);
            action.resetForm();
            action.setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <View >
              <Text style={styles.text}>
                Username*
              </Text>
              <TextInput
               style={styles.input}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              <Text  style={styles.text}>{errors.username && touched.username && errors.username}</Text>
              <Text style={styles.text}>
                Email address*
              </Text>
              <TextInput
               style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <Text  style={styles.text}>{errors.email && touched.email && errors.email}</Text>
  
              <Text style={styles.text}>
                Password*
              </Text>
              <TextInput
                style={styles.input} secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <Text  style={styles.text}>{errors.password && touched.password && errors.password}</Text>
  
              <Button
              disabled={isSubmitting}
              onPress={handleSubmit} title="Register"
              
            />
            </View>
          )}
        </Formik>
   
    );
  };
  
  export default RegisterForm;