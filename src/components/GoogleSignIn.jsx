import React, {useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import {useDispatch} from 'react-redux';
import userActions from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import toast  from 'react-hot-toast';


function GoogleSignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

function alerts(res) {
        if (res.data?.from === "signup") {
            if (res.data.success) {
                toast.success(res.data.message)
                    navigate('/signin')
            } else {
                toast.error(res.data.message)
            }
        }
}
async function handleCallbackResponse(response) {
        const userObject = jwt_decode(response.credential)
        const res = await dispatch(userActions.signIn({
                email: userObject.email,
                password: userObject.sub,
                image: userObject.picture,
                from: 'google',
                }
            ))   
        
        alerts(res)
}

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize ({
            client_id: '529496511687-juv47pmdvij7jpt2ld68icg5n4menlv5.apps.googleusercontent.com',
            callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(
            document.getElementById('googleButton'),
            { theme: "otuline", size: "standard", locale:'en', width: '90%' }
            )
     // eslint-disable-next-line
    },[])

    return (
        <>  
        <div>
            <div id='googleButton'></div>
        </div>
        </>
    )
}

export default GoogleSignIn;