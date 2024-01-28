import React, {  useState }  from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { auth } from '../../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import classes from './SingIn.module.css';

const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required()
})

const SingIn = () => {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
  
    const signInHandler = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            const token = response.user.accessToken;
            const userId = response._tokenResponse.localId;
            const userName = response.user.displayName;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            navigate('/main');
            // const postData = {
            //     userId: userId,
            //     userName: userName,
            //     email: email,
            //     transactions: [],
            // }
            // const dataFetching = await fetch(
            //     "https://money-tracking-app-d30a3-default-rtdb.firebaseio.com/users.json",
            //     {
            //       method: "POST",
            //       body: JSON.stringify(postData),
            //       headers: {
            //         "Content-Type": "application/json",
            //       },
            //     }
            //   );
        
            //   if (!dataFetching.ok) {
            //     throw new Error("Failed to store user data.");
            //   }
        } catch (error) {
            if (
                error.code === "auth/invalid-email" ||
                error.code === "auth/wrong-password" ||
                error.code === "auth/invalid-login-credentials"
            ) {
                setErrorMessage("Invalid email or password.");
            } else if (error.code === "auth/email-already-in-use") {
                setErrorMessage("This email is already in use by another user.");
            } else {
                setErrorMessage("Failed to sign in.");
            }
            console.log(error);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    }

    const submitForm = (data) => {
        console.log(data)
        const { email, password } = data;
        signInHandler(email, password);
    };

    // const userNameForDb = localStorage.getItem("userName")
    


    return (
        <div className={classes.signInForm}>
            <form className={classes.form} onSubmit={handleSubmit(submitForm)} >
                <div>
                    <h1 className={classes.logInHeader}>Sign In</h1>
                </div>
                <div className={classes.formContainer}>
                    <label>Email <p className={classes.errorMessage}>{errors.email?.message}</p></label>
                    <input type='email' name='email' placeholder='Enter your email'  {...register('email')}></input>
                    <label>Password <p className={classes.errorMessage}>{errors.password?.message}</p></label>
                    <input type='password' name='password' placeholder='Enter your password' {...register('password')}></input>
                </div>
                <br />
                {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                <button className={classes.button} type='submit'>submit</button>
                <p className={classes.redirectInSingUp}>Don't have an account? <Link className={classes.link} to={`?mode=${isLogin ? 'signup' : 'login'}`}>{isLogin ? 'signup' : 'login'}</Link></p>
            </form>
        </div>
    )
}

export default SingIn;