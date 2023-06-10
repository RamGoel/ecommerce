import React from 'react'
import { windowHeight, windowWidth } from '../utils/constants'
import { View, Image, StyleSheet } from 'react-native'
function Loader() {
    return (
        <View>
            <Image source={require('../assets/loader.gif')} style={styles.loader} />
            <Image source={require('../assets/loader.gif')} style={styles.loader} />
            <Image source={require('../assets/loader.gif')} style={styles.loader} />
            <Image source={require('../assets/loader.gif')} style={styles.loader} />
        </View>
    )
}
const styles = StyleSheet.create({
    loader: {
        width: windowWidth,
        resizeMode: 'contain'
    }
})

export default Loader