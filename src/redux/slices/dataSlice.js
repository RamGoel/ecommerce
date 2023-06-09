import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
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
        searchProducts: (state, action) => {
            if (action.payload === '') {
                state.filtered = state.products
                return;
            } else {
                var results = state.products.filter(obj => {
                    return obj.title.includes(action.payload) || obj.category.includes(action.payload)
                })

                state.filtered = results
            }
        },
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload
        }
    }
})

export const { selectProduct, setProducts, searchProducts } = dataSlice.actions

export default dataSlice.reducer