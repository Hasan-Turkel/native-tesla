import useTeslaCalls from "../../../hooks/useTeslaCalls";
import { Formik, Form, Field } from "formik";
import styles from "./UpdateCard.style";
import { Button, Text, TextInput, View } from "react-native";
import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";

const UpdateModal = ({ data, setUpdateModal, getDetailCard }) => {
  const { updateBlog, loading, err, data: cat, getCat } = useTeslaCalls();
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const statuses = ["draft", "publish"];
  const categoryRef = useRef({});
  const statusRef = useRef({});

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      getCat();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.update}>Update Blog</Text>
        <Ionicons
          name="close"
          size={24}
          color="grey"
          onPress={() => setUpdateModal(false)}
        />
      </View>
      <Formik
        enableReinitialize={true}
        initialValues={data}
        onSubmit={(values, action) => {
          // console.log(values);
          updateBlog({
            ...values,
            category: category,
            status: status == "draft" ? "d" : "p",
          });
          setUpdateModal(false);
          setTimeout(() => {
            getDetailCard(data.id);
          }, 1000);
          action.resetForm();
          action.setSubmitting(false);
          categoryRef.current.reset();
          statusRef.current.reset();
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
          <>
            <Text style={styles.text}>Title*</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
            <Text style={styles.text}>
              {errors.title && touched.title && errors.title}
            </Text>
            <Text style={styles.text}>Image Url*</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("image")}
              onBlur={handleBlur("image")}
              value={values.image}
            />
            <Text style={styles.text}>
              {errors.image && touched.image && errors.image}
            </Text>
            <Text style={styles.text}>Content*</Text>

            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={10}
              onChangeText={handleChange("content")}
              onBlur={handleBlur("content")}
              value={values.content}
            />
            <Text style={styles.text}>
              {errors.content && touched.content && errors.content}
            </Text>

            <Text style={styles.text}>
              Categories* (Please choose by clicking.)
            </Text>
            <SelectDropdown
              buttonStyle={styles.option}
              ref={categoryRef}
              data={cat}
              onSelect={(selectedItem, index) => {
                setCategory(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.name;
              }}
            />
            <Text style={styles.text}>
              Status* (Please choose by clicking.)
            </Text>
            <SelectDropdown
              buttonStyle={styles.option}
              ref={statusRef}
              data={statuses}
              onSelect={(selectedItem, index) => {
                setStatus(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />

            <Button
              disabled={isSubmitting}
              onPress={handleSubmit}
              title="Update Blog"
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default UpdateModal;
