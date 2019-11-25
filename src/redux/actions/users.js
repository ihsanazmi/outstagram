export const onRegisterSuccess = (data)=>{
    return{
        type: 'REGISTER_SUCCESS',
        payload: data
    }
}