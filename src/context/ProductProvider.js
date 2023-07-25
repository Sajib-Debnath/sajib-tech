import React, { createContext, useEffect, useReducer } from 'react';
import { useContext } from 'react';
import { initialState, productReducer } from '../state/productState/productReducer';
import { actionTypes } from '../state/productState/actionTypes';

const PRODUCT_CONTEXT = createContext()

const ProductProvider = ({ children }) => {

    // const [products, setProducts] = useState([])

    const [state, dispatch] = useReducer(productReducer, initialState)

    console.log(state);

    useEffect(() => {
        dispatch({ type: actionTypes.FETCHING_START })
        fetch("products.json")
            .then(res => res.json())
            .then(data => {
                dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data })
            })
            .catch(() => {
                dispatch({ type: actionTypes.FETCHING_ERROR })
            })

    }, [])

    const value = {
        state,
        dispatch
    }

    return (
        <PRODUCT_CONTEXT.Provider value={value}>
            {children}
        </PRODUCT_CONTEXT.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(PRODUCT_CONTEXT)
    return context;
}

export default ProductProvider;