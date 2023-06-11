import React from 'react'
import { windowHeight, windowWidth } from '../utils/constants'
import { View, Text, StyleSheet } from 'react-native'
function NoResults() {
    return (
        <View style={styles.box}>
            <Text>No Result Found</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    box: {
        width: windowWidth,
        resizeMode: 'contain',
        height:windowHeight*0.8,
        display:'flex',
        alignItems:'center',
        justifyContent:'center', 
    }
})

export default NoResults