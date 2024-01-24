import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./components/Signup";
import Login  from "./components/Login";
import Overboard from "./components/Overboard";
import Loading  from "./components/Loading";
import CreateGroup from "./components/CreateGroup"

// import Detail  from "./components/Detail";
import MyTabs from "./Navigation/MyTabs";
import MyTopTabs from "./Navigation/MyTopTabs";
import PageConfirmation from "./components/PageConfirmation";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const [user, setUser] = useState(null)
  const Stack = createNativeStackNavigator();
  useEffect(()=>{
    const fetchUser = async () =>{
    const res =  await SecureStore.getItemAsync("user")
    setUser(JSON.parse(res))
    }
    fetchUser()
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading"  screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        }, headerBackTitleStyle:{fontSize:20},
        headerTitleStyle:{color:"black"},headerBackTitleVisible: false,
      }} >
       {
       !user ? <>
       <Stack.Screen name="Loading" component={Loading} options={{headerStyle: {
           backgroundColor: 'black'
         },headerTintColor: 'black',
         }} />
       <Stack.Screen name="Overboard" component={Overboard} />
       <Stack.Screen name="PageConfirmation">
        {(props)=><PageConfirmation {...props} setUser={setUser}/>}
       </Stack.Screen>
       <Stack.Screen name="Signup" component={Signup} options={{headerBackTitle:"Accueil", title:null}} />
       <Stack.Screen name="Login" component={Login} options={{title:null}} />

        </> :
       <>
        <Stack.Screen name="MyTabs" options={{headerShown: false}}>
          {(props)=><MyTabs {...props} setUser={setUser} />}
        </Stack.Screen>
        {/* <Stack.Screen name="Detail" component={Detail} /> */}
        <Stack.Screen name="MyTopTabs" options={{}}>
          {(props)=><MyTopTabs {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CreateGroup" options={{}}>
          {(props)=><CreateGroup {...props} />}
        </Stack.Screen>
        </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}


