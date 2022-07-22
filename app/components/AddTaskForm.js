import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

function AddTaskForm({onSubmit}) {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(description);
    setDescription('');
  };

  return (
    <View style={styles.form}>
      <TextInput
        value={description}
        placeholder="Enter new task description"
        onChangeText={setDescription}
        style={styles.textInput}
      />
      <View style={styles.add}>
        <Button style={styles.add} onPress={handleSubmit} title="ADD"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 17,
    color: 'black',
  },
  add: {
    marginLeft: 10,
    height: 50,
    alignItems: 'center',
  },
});

export default AddTaskForm;
