import auth from "@react-native-firebase/auth"

const SignInRequest=async (value)=>{
    try{
        return await auth().signInWithEmailAndPassword(value.email,value.password);
    }catch(err){
       return err; 
    }
}

export default SignInRequest;