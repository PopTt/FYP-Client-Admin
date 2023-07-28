const authStore = {
    id: null,
    username: null,
    email: null
}

const loginReducer = (prevState, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...prevState,
                id: action.id,
                username: action.username,
                email: action.email
            }
        
        case 'LOGOUT':
            return {
                ...prevState,
                id: null,
                username: null,
                email: null
            }
    }
}


export {authStore, loginReducer}