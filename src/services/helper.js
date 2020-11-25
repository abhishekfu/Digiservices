import { Auth } from 'aws-amplify';
async function getCurrentUser(){
    const currentUser = await Auth.currentAuthenticatedUser();
    return currentUser;
}


export default getCurrentUser;