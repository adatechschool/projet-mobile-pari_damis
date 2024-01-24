import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Match from "../components/Match"
import Bet from "../components/Bet"
import Classement from '../components/Classement';
const MyTopTabs = ({route}) => {
    const Tab = createMaterialTopTabNavigator()
    const Stack = createNativeStackNavigator()
  return (
    <Tab.Navigator
    screenOptions={{
        title: null,
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarActiveBackgroundColor: "white",
        tabBarInactiveBackgroundColor: "red",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: 'black' }
      }}>
        <Tab.Screen
      name={"bottomNavMatch"}
      options={{
        tabBarLabel: "Match",
      }}
     >
        {()=><Stack.Navigator >
     <Stack.Screen name={"Match"} options={{ headerShown: false }}>
       {(props)=><Match {...props}route={route} />}
     </Stack.Screen>
     </Stack.Navigator>
      }
     </Tab.Screen>
        <Tab.Screen
      name={"bottomNavBet"}
      options={{
        tabBarLabel: "Bet",
      }}
     >
        {()=><Stack.Navigator >
     <Stack.Screen name={"Bet"} options={{ headerShown: false }}>
       {(props)=><Bet {...props} />}
     </Stack.Screen>
     </Stack.Navigator>
      }
     </Tab.Screen>
        <Tab.Screen
      name={"bottomNavClassement"}
      options={{
        tabBarLabel: "Classement",
      }}
     >
        {()=><Stack.Navigator >
     <Stack.Screen name={"Classement"} options={{ headerShown: false }}>
       {(props)=><Classement {...props} />}
     </Stack.Screen>
     </Stack.Navigator>
      }
     </Tab.Screen>
  </Tab.Navigator>
  )
}

export default MyTopTabs