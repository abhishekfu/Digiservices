const userReducer = (state,action)=>{
    switch (action.type){
        case 'SET_USER':
            return {
                email:action.email,
                username:action.username,
                profile_name:action.profile_name,
                phone_number:action.phone_number
            }
            case 'REMOVE_USER':
                return {
                    email:'',
                    username:'',
                    profile_name:'',
                    phone_number:''
                }
            default:
                return state;
    }
}

export default userReducer;