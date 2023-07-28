const orgStore = {
    orgs: [],
}

const orgReducer = (prevState, action) => {
    switch(action.type){
        case 'RETRIEVE_ORGANIZATIONS':
            return {
                ...prevState,
                orgs: action.orgs
            }
        
        case 'LOGOUT':
            return {
                ...prevState,
                orgs: [],
            }
    }
}


export {orgStore, orgReducer}