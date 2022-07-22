import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import Realm from 'realm';

import Task from './app/models/Task';
import AddTaskForm from './app/components/AddTaskForm';
import TaskList from './app/components/TaskList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
    this.realmRef = React.createRef();
    this.subscriptionRef = React.createRef();
    this.openRealm = this.openRealm.bind(this);
    this.closeRealm = this.closeRealm.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  async openRealm() {
    try {
      const config = {
        schema: [Task.schema],
      };

      const realm = await Realm.open(config);
      this.realmRef.current = realm;

      const tasksResults = realm.objects('Task');
      if (tasksResults?.length) {
        this.setState({tasks: tasksResults});
      }

      this.subscriptionRef.current = tasksResults;
      tasksResults.addListener(() => {
        this.setState({tasks: realm.objects('Task')});
      });
    } catch (err) {
      console.error('Error opening realm: ', err.message);
    }
  }

  closeRealm() {
    const subscription = this.subscriptionRef.current;
    subscription?.removeAllListeners();
    this.subscriptionRef.current = null;

    const realm = this.realmRef.current;
    realm?.close();
    this.realmRef.current = null;
    this.setState({tasks: []});
  }

  componentDidMount() {
    this.openRealm();
    this.closeRealm();
  }

  handleAddTask(description) {
    // console.log(description);
    if (!description) {
      return;
    }

    const realm = this.realmRef.current;
    realm?.write(() => {
      realm?.create('Task', new Task({description}));
    });
  }
  handleDeleteTask(task) {
    const realm = this.realmRef.current;
    realm?.write(() => {
      realm?.delete(task);
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.content}>
          <AddTaskForm onSubmit={this.handleAddTask} />
          <TaskList
            tasks={this.state.tasks}
            onDeleteTask={this.handleDeleteTask}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default App;
