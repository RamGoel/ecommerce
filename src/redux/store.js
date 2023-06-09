import dataSlice from "./slices/dataSlice";
import {configureStore} from '@reduxjs/toolkit'

const store=configureStore({
    reducer:{
        'data':dataSlice
    }
})

export default store