import React from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(description) {
    // console.log(description);
    this.props.onSubmit(description);
    this.setState({description: ''});
  }

  render() {
    return (
      <View style={styles.form}>
        <TextInput
          value={this.state.description}
          placeholder="Enter new task description"
          onChangeText={description => this.setState({description})}
          style={styles.textInput}
        />
        <View style={styles.add}>
          <Button
            style={styles.add}
            onPress={this.handleSubmit.bind(this, this.state.description)}
            title="ADD"></Button>
        </View>
      </View>
    );
  }
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
