import React from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { getDiscountedPrice } from '../utils/plugins'
import { windowHeight, windowWidth } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { selectProduct } from '../redux/slices/dataSlice'
import { useNavigation } from '@react-navigation/native';
function ProductCard({ data }) {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    function handleClick() {
        dispatch(selectProduct(data))
        navigation.navigate('Product Details')
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            handleClick()
        }}>
            <View style={styles.content}>
                <View style={styles.imgBox}>
                    <Image
                        style={styles.thumbnail}
                        source={{ uri: data.thumbnail }} />
                   
                </View>
                <Text style={styles.title}>{data.title}</Text>
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
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.45,
        height: windowHeight * 0.3,
        backgroundColor: 'transparent',
        borderRadius: 10,
        padding: 10,
        display:'flex',
        flexDirection:'row',
        borderColor: '#121212',
        borderWidth: 0.3,
        marginVertical: 10,
        marginHorizontal: 10
    },
    content: {
        height: windowHeight * 0.27
    },
    title: {
        fontSize: 20,
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        height: windowHeight * 0.1,
        width: windowHeight * 0.2,
        objectFit: 'cover',
        marginVertical: 10
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