import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findSameTask = tasks.find((item) => item.title === newTaskTitle);

    if (findSameTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

      return;
    }

    //TODO - add new task
    setTasks((state) => [
      ...state,
      { id: new Date().getTime(), done: false, title: newTaskTitle },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const findTask = tasks.find((item) => item.id === id);

    if (findTask) {
      setTasks((state) =>
        state.map((item) =>
          item.id === id ? { ...item, done: item.done ? false : true } : item
        )
      );
    }
  }

  function handleEditTask(prop: { taskId: number; taskNewTitle: string }) {
    const findTask = tasks.find((item) => item.id === prop.taskId);

    if (findTask) {
      setTasks((state) =>
        state.map((item) =>
          item.id === prop.taskId ? { ...item, title: prop.taskNewTitle } : item
        )
      );
    }
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const findTask = tasks.find((item) => item.id === id);

    if (findTask) {
      Alert.alert(
        "Remover item",
        "Tem certeza que você deseja remover esse item?",
        [
          {
            text: "Sim",
            onPress: () => {
              setTasks((state) => state.filter((item) => item.id !== id));
            },
            style: "default",
          },
          {
            text: "Não",
            style: "cancel",
          },
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
