import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} from "../../redux/features/category/categoryActions";
import AntDesign from "react-native-vector-icons/AntDesign";

const CreateCategories = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const categories = useSelector((state) => state.category.categories);
  const token = useSelector((state) => state?.user.token);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
console.log(categories)
  const handleCreateCategory =async () => {
   await  dispatch(createCategory(category,token));
   dispatch(getCategory());
    setCategory("");
  };

  const handleEditCategory = (categoryId) => {
    const selectedCategory = categories.find((item) => item._id === categoryId);
    setEditedCategory(selectedCategory);
    setEditing(true);
    setModalVisible(true);
  };

  const handleUpdateCategory =async () => {
    // Dispatch an action to update the category in MongoDB
  await  dispatch(updateCategory(editedCategory._id, editedCategory.name, token));
    dispatch(getCategory());
    setModalVisible(false);
    setEditing(false);
    
  };

  const handleDeleteCategory = async(categoryId) => {
   await dispatch(deleteCategory(categoryId,token));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Categories</Text>
      <TextInput
        style={styles.input}
        placeholder="Category Name"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleCreateCategory}
      >
        <Text style={styles.uploadButtonText}>Create</Text>
      </TouchableOpacity>

      <View style={styles.categoryList}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.categoryItemContainer}>
              <Text style={styles.categoryItem}>{item.category}</Text>
              <View style={styles.categoryOptions}>
                <TouchableOpacity onPress={() => handleEditCategory(item._id)}>
                  <AntDesign name="edit" style={styles.editIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteCategory(item._id)}
                >
                  <AntDesign name="delete" style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* Modal for editing category */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Edit Category</Text>
          <TextInput
            style={styles.input}
            placeholder="New Category Name"
            value={editedCategory.name}
            onChangeText={(text) =>
              setEditedCategory({ ...editedCategory, name: text })
            }
          />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUpdateCategory}
          >
            <Text style={styles.uploadButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp("5%"),
    alignItems: "center",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  input: {
    height: hp("5%"),
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: hp("2%"),
    paddingHorizontal: wp("2%"),
    width: wp("80%"),
  },
  uploadButton: {
    backgroundColor: "#DE3163",
    paddingVertical: hp("1.7%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    width: wp("80%"),
  },
  uploadButtonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: hp("1.9%"),
  },
  categoryList: {
    marginTop: 20,
    width: wp("80%"),
  },
  categoryItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryItem: {
    fontSize: 16,
    flex: 1,
  },
  categoryOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editIcon: {
    fontSize: 20,
    color: "#007bff",
    marginRight: 10,
  },
  deleteIcon: {
    fontSize: 20,
    color: "red",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: wp("5%"),
    alignItems: "center",
    marginTop: hp("20%"),
  },
});

export default CreateCategories;
