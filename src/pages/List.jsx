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
import NoResults from '../components/NoResults'
function List() {
    const products = useSelector(state => state.data.products)
    const filtered = useSelector(state => state.data.filtered)
    const categories = useSelector(state => state.data.categories)
    const [isLoaded, setLoaded] = useState(false)
    const [selected, setSelected] = useState('All')
    const dispatch = useDispatch()
    var listShowCount = filtered.length;
    useEffect(e => {
        setLoaded(false)
        fetch(apiUrl).then(res => res.json()).then(result => {
            dispatch(setProducts(result['products']))
        }).catch(err => {
            console.log(err)
        })
        fetch(`${apiUrl}/categories`).then(res => res.json()).then(result => {
            dispatch(setCategories(['All', ...result]))
            setLoaded(true)
        }).catch(err => {
            console.log(err)
            setLoaded(true)
        })
    }, [])


    useEffect(e => {
        if (selected == 'All') {
            dispatch(filterByCategory({ category: selected, isAll: true }))
        } else {
            dispatch(filterByCategory({ category: selected, isAll: false }))
        }
    }, [selected])
    return (
        (isLoaded && products.length) ? <View style={styles.page}>
            <Input
                placeholder={'Search by name or category'}
                onChangeHandler={(val) => {
                    dispatch(searchProducts(val))
                }} />
            <ScrollView horizontal={true} contentContainerStyle={styles.chipBox}>
                {
                    categories.length ? categories.map(e => {
                        return <CategoryChip
                            text={e}
                            isSelected={(selected == e)}
                            handler={() => setSelected(e)} />
                    }) : null
                }
            </ScrollView>
            <ScrollView contentContainerStyle={styles.list}>
                {
                    filtered.length ? filtered.map((productObj, index) => {
                        return (index < listShowCount) && <ProductCard key={productObj.id} data={productObj} isLast={(listShowCount.length % 2 == 0) && (index == listShowCount - 1)} />
                    }) : <NoResults />
                    
                }
            </ScrollView>
        </View> : <Loader />
    )
}

const styles = StyleSheet.create({
    page:{
        backgroundColor:'white'
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingBottom: windowHeight * 0.2,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: windowWidth * 0.95,
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    chipBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.06,
        paddingHorizontal: windowWidth * 0.03,
        marginBottom: 10
    }

})

export default List