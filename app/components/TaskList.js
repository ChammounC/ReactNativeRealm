import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import TaskItem from './TaskItem';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={this.props.tasks}
          keyExtractor={task => task._id.toString()}
          renderItem={({item}) => (
            <TaskItem
              description={item.description}
              onDelete={() => this.props.onDeleteTask(item)}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default TaskList;
