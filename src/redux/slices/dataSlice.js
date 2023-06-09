import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    products: [],
    selectedProduct: []
}


const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducer: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload
        }
    }
})

export const { selectProduct, setProducts } = dataSlice.actions

export default dataSlice.reducer