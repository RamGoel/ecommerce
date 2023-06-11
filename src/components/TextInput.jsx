import React from 'react'
import { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { windowHeight, windowWidth } from '../utils/constants'

function Input({ placeholder, onChangeHandler, value, isSearch }) {
    return (
        <View style={styles.cover}>
         <View style={styles.searchInputBox}>
            <TextInput
                placeholder={placeholder}
                onChangeText={e=>{
                    onChangeHandler(e)
                }}
                value={value}
                style={{
                    ...styles.searchInput,
                    width:(!isSearch)?'95%':'80%'
                }}
            />
            {isSearch && <Text>search</Text>}
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchInputBox:{
        borderColor: '#121212',
        borderWidth: 0.3,
        borderRadius:200,
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:10,
        width:windowWidth*0.95,
        height:windowHeight*0.07
    },
    searchInput: {
        paddingHorizontal: 10,
    },
    cover:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
    }
})

export default Input