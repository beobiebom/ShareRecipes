import React from 'react'
import {TextInput} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
const Input=({
    margin,
    padding,
    value,
    border,
    borderRadius,
    onChangeText,
    secureTextEntry,
    style,
    placeholder,
    fontSize,
    ...props
})=>{
    const styleComponent=[
        margin&&{margin},
        padding&&{padding},
        border&&{borderBottomWidth:0.7,borderColor:"black",},
        borderRadius&&{borderRadius},
        fontSize&&{fontSize},
        style,
    ];
    return(
        <TextInput
            style={styleComponent}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            {...props}
        />
    )
}

export default Input