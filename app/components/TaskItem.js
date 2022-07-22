import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

function TaskItem({description, onDelete}) {
  return (
    <Pressable onPress={onDelete}>
      <View style={styles.task}>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={1} style={styles.description}>
            {description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
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
