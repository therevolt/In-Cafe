const initialstate = {
    data: {
        status: false,
        message: "",
        data: {
            userId: 0,
            firstName: "",
            lastName: "",
            displayName: "",
            email: "",
            gender: "",
            role: "",
            address: "",
            phone: "",
            birthday: "",
            avatar: "",
            active: false,
            createdAt: "",
            updatedAt: "",
            token: "",
            refreshToken: ""
        }
    }
}

const User = (state = initialstate, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                data : action.payload
            }
        default: 
            return state
    }
}

export default User