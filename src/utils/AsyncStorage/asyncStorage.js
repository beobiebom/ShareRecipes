import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage=new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:7*1000*3600*24,
    enableCache:true,
});

export const saveToken=async (value)=>{
    await storage.save({
        key:"sharerecipes",
        data:value
    });
};

export const loadToken = (key) => {
    return storage.load({
        key: "sharerecipes"
    });
};