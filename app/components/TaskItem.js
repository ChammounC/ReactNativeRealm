import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Pressable onPress={this.props.onDelete}>
        <View style={styles.task}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{this.props.description}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  task: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 17,
  },
});
export default TaskItem;
