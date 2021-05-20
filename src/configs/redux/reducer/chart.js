const initalstate = {
    products: [],
    total: 0
}

const Chart = (state = initalstate, action) => {
    switch (action.type) {
        case 'SET_TO_CHART_PRODUCT':
            return { products: action.payload, total: action.total }
        case 'RESET_CART':
            return {products: [], total: 0}
        default: return state
    }
}

export default Chart