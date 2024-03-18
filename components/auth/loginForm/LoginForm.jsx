import React from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import { Button, Text, TextInput, View } from "react-native";
import styles from "./LoginForm.style";
import useAuthCalls from "../../../hooks/useAuthCalls";


const LoginForm = ({navigation}) => {
  const { login } = useAuthCalls(navigation);

  const loginSchema = object({
    email: string().email().required("Email is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters.")
      .max(16, "Password must be at least 16 characters")
      .matches(/\d+/, "Password must contain number.")
      .matches(/[a-z]/, "Password must contain lowercase letter.")
      .matches(/[A-Z]/, "Password must contain uppercase letter.")
      .matches(/[!,?{}><%&$#£+-.]+/, "Password must contain custom character."),
  });

  return (
   <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, action) => {
        login(values);
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
            <Text style={styles.text} >
              Email address*
            </Text>
            <TextInput style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <Text style={styles.text}>{errors.email && touched.email && errors.email}</Text>

            <Text style={styles.text}>
              Password*
            </Text>
            <TextInput style={styles.input} secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Text style={styles.text}>{errors.password && touched.password && errors.password}</Text>

            <Button
              disabled={isSubmitting}
              onPress={handleSubmit} title="Login"
              
            />
          </View>
        )}
      </Formik>
      </>
  );
};

export default LoginForm;