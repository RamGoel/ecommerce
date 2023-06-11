import React from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { getDiscountedPrice } from '../utils/plugins'
import { windowHeight, windowWidth } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { selectProduct } from '../redux/slices/dataSlice'
import { useNavigation } from '@react-navigation/native';
function ProductCard(props) {
    const dispatch = useDispatch()
    const { data, isLast } = props
    const navigation = useNavigation()
    function handleClick() {
        dispatch(selectProduct(data))
        navigation.navigate('Product Details')
    }
    return (
        <TouchableOpacity style={{
            ...styles.container,
            marginRight: isLast ? 'auto' : 0
        }} onPress={() => {
            handleClick()
        }}>
            <View style={styles.content}>
                <View style={styles.imgBox}>
                    <Image
                        style={styles.thumbnail}
                        source={{ uri: data.thumbnail }} />

                </View>
                <View style={styles.textContent}>

                <Text style={styles.title}>{data.title.substring(0,25)}</Text>
                <Text style={styles.brand}>by {data.brand}</Text>
                <View style={styles.cardRow}>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{data.price}₹</Text>
                        <Text style={styles.dPrice}> {Math.round(getDiscountedPrice(data.price, data.discountPercentage))}₹</Text>
                    </View>
                    <Text style={styles.rating}>{data.rating}★</Text>
                </View>
                <Text style={styles.stock}>{data.stock} units available</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.45,
        backgroundColor: 'white',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#121212',
        borderWidth: 0.3,
        marginVertical: windowHeight*0.01,
        // paddingVertical:windowHeight*0.015
    },
    content: {
        height: windowHeight * 0.28,
        width: windowWidth * 0.38,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    brand: {
        fontSize: 14
    },
    priceRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: 'red'
    },
    dPrice: {
        fontSize: 18,
        color: 'green'
    },
    rating: {
        backgroundColor: 'green',
        color: 'white',
        width: '30%',
        textAlign: 'center',
        borderRadius: 100,
        paddingHorizontal: 3,
        paddingVertical: 3,
        fontSize: 10
    },
    imgBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor:'red'
    },
    thumbnail: {
        height: windowHeight * 0.14,
        width: windowWidth * 0.445,
        objectFit: 'contain',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    iconBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%'
    },
    icon: {
        width: 30,
        height: 30
    },
    cardRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default ProductCard