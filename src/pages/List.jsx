import React from 'react'
import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { apiUrl, windowHeight, windowWidth } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { ScrollView } from 'react-native'
import Input from '../components/TextInput'
import { filterByCategory, searchProducts, setCategories, setProducts } from '../redux/slices/dataSlice'
import Loader from '../components/Loader'
import CategoryChip from '../components/CategoryChip'
function List() {
    const products = useSelector(state => state.data.products)
    const filtered = useSelector(state => state.data.filtered)
    const categories = useSelector(state => state.data.categories)
    const [isLoaded, setLoaded] = useState(false)
    const [selected, setSelected] = useState('All')
    const dispatch = useDispatch()

    useEffect(e => {
        setLoaded(false)
        fetch(apiUrl).then(res => res.json()).then(result => {
            dispatch(setProducts(result['products']))
        }).catch(err => {
            console.log(err)
        })
        fetch(`${apiUrl}/categories`).then(res => res.json()).then(result => {
            dispatch(setCategories(['All',...result]))
            setLoaded(true)
        }).catch(err => {
            console.log(err)
            setLoaded(true)
        })
    }, [])


    useEffect(e=>{
        if(selected=='All'){
            dispatch(filterByCategory({category:selected, isAll:true}))
        }else{
            dispatch(filterByCategory({category:selected, isAll:false}))
        }
    },[selected])
    return (
        (isLoaded && products.length) ? <View>
            <Input
                placeholder={'Search by name or category'}
                isSearch={true}
                onChangeHandler={(val) => {
                    dispatch(searchProducts(val))
                }} />
            <ScrollView horizontal={true} contentContainerStyle={styles.chipBox}>
                {
                    categories.length ? categories.map(e => {
                        return <CategoryChip
                            text={e}
                            isSelected={(selected==e)}
                            handler={() => setSelected(e)} />
                    }) : null
                }
            </ScrollView>
            <ScrollView contentContainerStyle={styles.list}>
                {
                    filtered.length ? filtered.map((productObj, index) => {
                        return  <ProductCard key={productObj.id} data={productObj} />
                    }) : <Text>No Result Found</Text>
                }
            </ScrollView>
        </View> : <Loader />
    )
}

const styles = StyleSheet.create({
    list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingBottom:windowHeight*0.15,
        justifyContent: 'flex-start'
    },
    chipBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.06,
        paddingHorizontal:windowWidth*0.03,
        marginBottom:10
    }

})

export default List