import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    categories: [],
    filtered: [],
    selectedProduct: []
}


const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
            state.filtered = action.payload
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        searchProducts: (state, action) => {
            if (action.payload === '') {
                state.filtered = state.products
                return;
            } else {
                var results = state.products.filter(obj => {
                    return (
                        obj.title.toLowerCase()
                        .includes(action.payload.toLowerCase()) || 
                        obj.category.toLowerCase()
                        .includes(action.payload.toLowerCase())
                )})

                state.filtered = results
            }
        },
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        filterByCategory:(state,action)=>{
            if(action.payload.isAll){
                state.filtered=state.products
            }else{
                var results = state.products.filter(obj => {
                    return obj.category.toLowerCase()==(action.payload.category.toLowerCase())
                })

                state.filtered = results
            }
        }
    }
})

export const {
    selectProduct,
    setCategories,
    setProducts,
    searchProducts,
    filterByCategory
} = dataSlice.actions

export default dataSlice.reducer