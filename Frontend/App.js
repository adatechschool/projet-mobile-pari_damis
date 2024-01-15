import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Signup from "./components/Signup";
import Login  from "./components/Login";
import Overboard from "./components/Overboard";
import Loading  from "./components/Loading";
import MyTabs from "./Navigation/MyTabs";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading"  screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        }, headerBackTitleStyle:{fontSize:20},
        headerTitleStyle:{color:"black"},headerBackTitleVisible: false,
      }} >
         <Stack.Screen name="Loading" component={Loading} options={{headerStyle: {
            backgroundColor: 'black'
          },headerTintColor: 'black',
          }} />
        <Stack.Screen name="Overboard" component={Overboard} />
        <Stack.Screen name="Signup" component={Signup} options={{headerBackTitle:"Accueil", title:null}} />
        <Stack.Screen name="Login" component={Login} options={{title:null}} />
       <Stack.Screen name="MyTabs"  options={{headerShown: false}} component={MyTabs}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
