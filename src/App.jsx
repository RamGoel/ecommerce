import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { View } from 'react-native'
import List from './pages/List'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import ProductDetail from './pages/ProductDetails'
import EditProduct from './pages/EditProduct'
function Router() {
    const Stack = createNativeStackNavigator()
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={List}
                        options={{headerShown:false}}
                    />
                    <Stack.Screen
                        name="Product Details"
                        component={ProductDetail}
                        // options={{headerShown:false}}
                    />
                    <Stack.Screen
                        name="Edit Product"
                        component={EditProduct}
                        // options={{headerShown:false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    )
}

export default Router