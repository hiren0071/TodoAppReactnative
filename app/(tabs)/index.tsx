import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/components/Login';
import TodoScreen from '@/components/TodoView';

const Stack = createStackNavigator();

const App = () => {
  return (
  
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Todos" component={TodoScreen} />
      </Stack.Navigator>
  
  );
};

export default App;
