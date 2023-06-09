import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getDiscountedPrice } from '../utils/plugins'
import { windowHeight, windowWidth } from '../utils/constants'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
function ProductDetail() {
    const data = useSelector(state => state.data.selectedProduct)
    const navigation=useNavigation()
    return (
        <View style={styles.container}>

            <View style={styles.imgBox}>
                <Image
                    style={styles.thumbnail}
                    source={{ uri: data.thumbnail }} />
                <View style={styles.iconBox}>
                    {data.images[0] && <Image
                        style={styles.icon}
                        source={{ uri: data.images[0] }} />}
                    {data.images[1] && <Image
                        style={styles.icon}
                        source={{ uri: data.images[1] }} />}
                    {data.images[2] && <Image
                        style={styles.icon}
                        source={{ uri: data.images[2] }} />}
                    {data.images[3] && <Image
                        style={styles.icon}
                        source={{ uri: data.images[3] }} />}

                </View>
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
            <View style={styles.divider}></View>
            <Text style={styles.desc}>{data.description}</Text>
            <View style={styles.divider}></View>

            <View style={styles.btnBox}>
                <Button 
                    btnText={'Edit'} 
                    onClickHandler={()=>{
                        navigation.navigate('EditProduct')
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        backgroundColor: 'white',
        height: windowHeight,
        padding:windowHeight*0.01
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        height:windowHeight*0.04
    },
    brand: {
        fontSize: 18,
        height:windowHeight*0.03
    },
    priceRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height:windowHeight*0.05
    },
    price: {
        fontSize: 22,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: 'red'
    },
    dPrice: {
        fontSize: 22,
        color: 'green'
    },
    rating: {
        backgroundColor: 'green',
        color: 'white',
        width: '18%',
        textAlign: 'center',
        borderRadius: 100,
        paddingHorizontal: 3,
        paddingVertical: 3,
        fontSize: 15,
        height:windowHeight*0.03

    },
    imgBox: {
        display: 'flex',
        height: windowHeight * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        height: windowHeight * 0.3,
        width: '100%',
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
        width: windowWidth * 0.23,
        objectFit: 'contain',
        height: windowWidth * 0.23
    },
    cardRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    divider: {
        borderColor: '#121212',
        borderWidth: .2,
        marginVertical: 10,
        opacity: .4
    },
    stock: {
        fontSize: 18
    },
    desc: {
        fontSize: 15,
        height:windowHeight*0.05
    },
    btnBox: {
        ...this.cardRow,
        height:windowHeight*0.18,
        alignItems:'flex-end',
        justifyContent:'flex-end'
    }

})

export default ProductDetail