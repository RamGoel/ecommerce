import React from 'react'
import { useEffect } from 'react'
import { View, Text,TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { windowWidth, windowHeight } from '../utils/constants'

function Button({ btnText, onClickHandler }) {
    return (
        <TouchableOpacity style={styles.btn} onPress={()=>{
            onClickHandler()
        }}>
            <View style={styles.btnInner}>
                <Text style={styles.btnText}>{btnText}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    btn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
        borderRadius: 10,
        width: windowWidth * 0.95,
        height: windowHeight * 0.08
    },
    btnInner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 18
    },
})

export default Button