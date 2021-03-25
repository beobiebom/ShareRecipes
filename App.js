import React from 'react';
import {AuthContext} from './src/authContext/AuthContext'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useAuth} from "./src/authContext/useAuth";
import {Onboarding,Home} from "./src/screens/index"
import {SignStack} from "./src/navigation/index"
import {Storage} from "./src/utils/index"
const App=()=>{
    const Stack=createStackNavigator()
    const {authContext,state}=useAuth()
    
    React.useEffect(()=>{
        try{
            Storage.loadToken("sharerecipes").then((uid)=>{
                state.isLoading=false
            }).catch((e) => console.log(e))
        }catch(e){
            console.log(e)
        }
    },[]);

    return(
        <AuthContext.Provider value={{authContext,initialState:state}} > 
            <NavigationContainer>
                <Stack.Navigator>
                    {/* <Stack.Screen name="Home" component={Home} options={{headerShown:null,}}  /> */}
                    {
                        state.isLoading?(    
                            <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown:null,}} />
                        ):state.userUID==null?
                        (
                            <Stack.Screen name="SignStack" component={SignStack} options={{headerShown:null,}} />
                        ):(
                            <Stack.Screen name="Home" component={Home} options={{headerShown:null,}} />
                        )

                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
export default App;