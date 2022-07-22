import React, {useState, useEffect, useRef, useCallback} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import Realm from 'realm';

import Task from './app/models/Task';
import AddTaskForm from './app/components/AddTaskForm';
import TaskList from './app/components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const realmRef = useRef(null);
  const subscriptionRef = useRef(null);

  const openRealm = useCallback(async () => {
    try {
      const config = {
        schema: [Task.schema],
      };

      const realm = await Realm.open(config);
      realmRef.current = realm;

      const tasksResults = realm.objects('Task');
      if (tasksResults?.length) {
        setTasks(tasksResults);
      }

      subscriptionRef.current = tasksResults;
      tasksResults.addListener(() => {
        setTasks(realm.objects('Task'));
      });
    } catch (err) {
      console.error('Error opening realm: ', err.message);
    }
  }, [realmRef, setTasks]);

  const closeRealm = useCallback(() => {
    const subscription = subscriptionRef.current;
    subscription?.removeAllListeners();
    subscriptionRef.current = null;

    const realm = realmRef.current;
    realm?.close();
    realmRef.current = null;
    setTasks([]);
  }, [realmRef]);

  useEffect(() => {
    openRealm();

    return closeRealm;
  }, [openRealm, closeRealm]);

  const handleAddTask = useCallback(
    description => {
      if (!description) {
        return;
      }

      const realm = realmRef.current;
      realm?.write(() => {
        realm?.create('Task', new Task({description}));
      });
    },
    [realmRef],
  );

  const handleDeleteTask = useCallback(
    task => {
      const realm = realmRef.current;
      realm?.write(() => {
        realm?.delete(task);
      });
    },
    [realmRef],
  );
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <AddTaskForm onSubmit={handleAddTask} />
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      </View>
    </SafeAreaView>
  );
};

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
