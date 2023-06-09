import React from 'react'
import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { apiUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { ScrollView } from 'react-native'
import Input from '../components/TextInput'
import { searchProducts, setProducts } from '../redux/slices/dataSlice'
function List() {
    const filtered = useSelector(state => state.data.filtered)
    const [isLoaded, setLoaded] = useState(true)
    const dispatch = useDispatch()

    useEffect(e => {
        fetch(apiUrl).then(res => res.json()).then(result => {
            dispatch(setProducts(result['products']))
            setLoaded(true)
        }).catch(err => {
            console.log(err)
            alert("Some Error Occured")
            setLoaded(true)
        })
    }, [])

    return (
        isLoaded ? <View>
            <Input
                placeholder={'Search by name or category'}
                isSearch={true}
                onChangeHandler={(val) => {
                    dispatch(searchProducts(val))
                }} />
            <ScrollView contentContainerStyle={styles.list}>
                {
                    filtered.map((productObj, index) => {
                        return (index < 4) && <ProductCard key={productObj.id} data={productObj} />
                    })
                }
            </ScrollView>
        </View> : <Text>'Loading....'</Text>
    )
}

const styles = StyleSheet.create({
    list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },

})

export default List