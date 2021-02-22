import React from 'react';
import {Text, StyleSheet, TouchableOpacity,View} from 'react-native';

const styles=StyleSheet.create({
    block:{
        flex:1,
    },
});
const Button=({
    block,
    margin,
    padding,
    width,
    height,
    border,
    borderWidth,
    borderColor,
    borderRadius,
    color,
    fontSize,
    textColor,
    style,
    textStyle,
    children,
    icon,
    onPress,
    ...props
})=>{
    const styleComponent=[
        block && styles.block,
        margin && {margin},
        padding && {padding},
        width && {width},
        height && {height},
        border && {borderWidth:1,borderColor:'black'},
        borderWidth && {borderWidth},
        borderColor && {borderColor},
        borderRadius && {borderRadius},
        color && {backgroundColor:color},
        style,
    ];
    const styleText=[
        fontSize && {fontSize},
        textColor && {color:textColor},
        textStyle,
    ];
    let content=(
        <Text style={styleText}>{children}</Text>
    )
    if(icon){
        content=(
            children
        )
    }
    return(
        <TouchableOpacity style={styleComponent} {...{onPress}}>
                {content}
        </TouchableOpacity>
    )
}
export default Button;