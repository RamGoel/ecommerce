import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
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
            throw (err)
            alert("Some Error Occusred")
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

    return (
        <View style={styles.page}>
            {
                (Object.keys(data).length)
                    ? <View style={styles.container}>
                        <View>
                            {Object.keys(data).map(key => {
                                return !excludedKeys.includes(key) && <Input
                                    placeholder={key}
                                    value={data[key].toString()}
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
                        </View>

                    </View>
                    : ''
            }
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // height: windowHeight * 0.9
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.9,
    },
    btnBox: {
        ...this.cardRow,
        height: windowHeight * 0.2,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
})

export default EditProduct