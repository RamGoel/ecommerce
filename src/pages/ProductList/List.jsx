import React from 'react'
import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { apiUrl } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../redux/slices/dataSlice'
function List() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.data.products)
    useEffect(e => {
        fetch(apiUrl).then(res => res.json()).then(data => {
            dispatch(setProducts(data))
        }).catch(err => {
            console.log(err)
            alert("Some Error Occured")
        })
    }, [])
    return (
        <View>
            <Text>

            {
                JSON.stringify(products)
            }
            </Text>
        </View>
    )
}

export default List