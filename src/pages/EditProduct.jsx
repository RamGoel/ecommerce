import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../components/TextInput'
import Button from '../components/Button'
import { windowHeight } from '../utils/constants'
import { apiUrl } from '../utils/constants'
import { setProducts } from '../redux/slices/dataSlice'
import { useNavigation } from '@react-navigation/native'
import { convertArrayToObject } from '../utils/plugins'
function EditProduct() {
    const selectedProduct = useSelector(state => state.data.selectedProduct)
    const products = useSelector(state => state.data.products)
    const [data, setData] = useState({})
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const excludedKeys = ['images', 'thumbnail', 'id', 'discountPercentage']
    const handleSubmit = () => {
        var body = data;
        delete body['id']
        fetch(`${apiUrl}/${selectedProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(result => {
            updateData(result)
        }).catch(err => {
            alert("Some Error Occusred")
            throw (err)
        })
    }

    const updateData = (result) => {
        console.log(result)
        var productsObj = convertArrayToObject(products, val => val.id !== selectedProduct.id)

        productsObj[selectedProduct.id] = {
            ...selectedProduct, ...data
        }

        dispatch(setProducts(Object.values(productsObj)))
        alert("successfully updated")
        navigation.navigate('Home')
    }

    useEffect(e => {
        setData(selectedProduct)
    }, [])

    let getEditFields=(product)=>{
        return({
            title:product.title,
            description:product.description,
            category:product.category,
            price:product.price,
            discountPercentage:product.discountPercentage,
            stock:product.stock,
            brand:product.brand,
            sku:product.sku,
        })
    }

    return (
        Object.keys(getEditFields(data)).length)
                    ? <ScrollView contentContainerStyle={styles.container}>
                            {Object.keys(getEditFields(data)).map(key => {
                               
                                return <Input
                                    placeholder={key}
                                    key={key}
                                    value={data[key]?.toString() || ""}
                                    onChangeHandler={
                                        (val) => setData(
                                            {
                                                ...data,
                                                [key]: val
                                            }
                                        )}
                                />
                            })}
                            <View style={styles.btnBox}>

                                <Button
                                    btnText={'Update'}
                                    onClickHandler={() => handleSubmit()}
                                />
                            </View>

                    </ScrollView>
                    : null
    
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'column',
        height: windowHeight * 0.9,
    },
    btnBox: {
        ...this.cardRow,
        flexGrow:1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})

export default EditProduct