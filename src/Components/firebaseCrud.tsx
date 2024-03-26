import {View, Text} from 'react-native';
import React from 'react';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const FirebaseCrud = () => {
  const newData = [];
  //Add data to the firebase firestore
  const addTask = async (taskData: FirebaseFirestoreTypes.DocumentData) => {
    try {
      //point to firestore.collections and add tasks collection and ass (taskdata)
      await firestore().collection('tasks').add(taskData);
      console.log('Task added successfully!');
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

  //Get the data from the firestore
  const getTasks = async () => {
    try {
      const TasksData = await firestore().collection('tasks').get();
      const tasks = TasksData.docs.map(doc => ({id: doc.id, ...doc.data()}));
      console.log('Tasks: ', tasks);
    } catch (error) {
      console.error('Error getting tasks: ', error);
    }
  };

  //Update the firestore data
  const updateTask = async (taskId: string, newData) => {
    try {
      await firestore().collection('tasks').doc(taskId).update(newData);
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  //Delete the data from the firestore

  const deleteTask = async (taskId: string) => {
    try {
      await firestore().collection('tasks').doc(taskId).delete();
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };
  return (
    <View>
      <Text>firebaseCrud</Text>
    </View>
  );
};

export default FirebaseCrud;
