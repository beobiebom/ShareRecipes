import firestore from '@react-native-firebase/firestore';

export const fetchRecipes=async ()=>{
    let DATA=[]
    await firestore().collection('Recipes').get() .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
            DATA.push(documentSnapshot.data());
        });
    });
    return DATA;
}