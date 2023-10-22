import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import classes from './SingUp.module.css'

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required()
})

const SingUp = () => {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'signup';

    const [errorMessage, setErrorMessage] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const signUnHandler =async (name, email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response);
            updateProfile(response.user, {
                displayName: name,
            })
        } catch (error) {
            if (
                error.code === "auth/invalid-email" ||
                error.code === "auth/wrong-password"
            ) {
                setErrorMessage("Invalid email or password.");
            } else if (error.code === "auth/email-already-in-use") {
                setErrorMessage("This email is already in use by another user.");
            } else {
                setErrorMessage("Failed to create user.");
            }
            console.log(error);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    }

    const submitForm = (data) => {
        console.log(data)
        const { name, email, password } = data;
        signUnHandler(name, email, password);
    };

    return (
        <div className={classes.signInForm}>
            <form className={classes.form} onSubmit={handleSubmit(submitForm)} >
                <div>
                    <h1 className={classes.logInHeader}>SIgn Up</h1>
                </div>
                <div className={classes.formContainer}>
                    <label>Name <p className={classes.errorMessage}>{errors.name?.message}</p></label>
                    <input type='text' name='name' placeholder='Enter your name'  {...register('name')}></input>
                    <label>Email <p className={classes.errorMessage}>{errors.email?.message}</p></label>
                    <input type='email' name='email' placeholder='Enter your email'  {...register('email')}></input>
                    <label>Password <p className={classes.errorMessage}>{errors.password?.message}</p></label>
                    <input type='password' name='password' placeholder='Enter your password' {...register('password')}></input>
                </div>
                <br />
                {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                <button className={classes.button} type='submit'>submit</button>
                <p className={classes.redirectInSingUp}>Already have an account? <Link className={classes.link} to={`?mode=${isLogin ? 'login' : 'signup'}`}>{isLogin ? 'log in' : 'sign up'}</Link></p>
            </form>
        </div>
    )
}

export default SingUp;