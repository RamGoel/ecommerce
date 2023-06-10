import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../utils/constants'

function CategoryChip({ text, handler, isSelected }) {
    return (
        <TouchableOpacity 
        style={{...styles.chip, backgroundColor:(isSelected)?'black':'white'}} 
        onPress={() => handler()}>
            <Text style={{...styles.chipText, color:(isSelected)?'white':'black'}}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    chip:{
        height:windowHeight*0.035,
        paddingHorizontal:windowWidth*0.03,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginRight:windowWidth*0.02,
        borderRadius:200,
        borderColor:'black',
        borderWidth:0.3
    }
})
export default CategoryChip