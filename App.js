import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { HomeScreen, MedicosScreen, MedicoScreen } from './screens/'


const App = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Medicos: {
    screen: MedicosScreen
  },/*
  Medico: {
    screen: MedicoScreen
  }*/
})

export default App