const initalstate = {
    keywords: ''
}

const Key = (state = initalstate, action) => {
    switch(action.type){
        case 'REQUEST_KEY' :
            return { keywords : action.payload }
        default : return state
    }
}

export default Key