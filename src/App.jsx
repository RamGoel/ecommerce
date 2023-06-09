import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { View } from 'react-native'
import List from './pages/ProductList/List'
function App() {
    return (
        <Provider store={store}>
            <View>
                <List />
            </View>
        </Provider>

    )
}

export default App