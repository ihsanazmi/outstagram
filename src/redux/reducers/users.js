const users = {
    id: '',
    username: '',
    profile_pict: ''
}

const UserReducer = (state = users, action) =>{
    if(action.type === 'REGISTER_SUCCESS'){
        return action.payload
    }else{
        return state
    }
}

export default UserReducer