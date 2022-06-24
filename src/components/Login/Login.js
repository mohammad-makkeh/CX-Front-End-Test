import './Login.css';
import CX_LOGO from '../../assets/CX_LOGO.png';
import {useRef} from 'react'



const Login = (props) => {

    //reference the input fields
    const nameRef = useRef();
    const passRef = useRef();


    const handleLogin = (e) => {
        e.preventDefault(); //to not refresh the page
        if(validCredentials(nameRef.current.value,  passRef.current.value))
            props.setLoggedIn(true);    //change the app state
        else alert('Correct credentials for login are: demo, demo');
    }

   

    return (
        <>
            <div className='login-container'>
                <img src={CX_LOGO} alt='CX_LOGO'/>
                <form>
                    <div className='input-group'>
                        <label htmlfor="username">Username</label>
                        <input ref={nameRef} id="username" type="text" placeholder="demo"/>
                    </div>
                    <div className='input-group'>
                        <label htmlfor="pass">Password</label>
                        <input ref={passRef} id="pass" type="text" placeholder="demo"/>
                    </div>
                    <input type="submit" onClick={handleLogin}/>
                </form>

            </div>
        </>
    )
}

export const validCredentials = (name,  pass) => {
    return name==='demo' && pass==='demo';
}

export default Login;