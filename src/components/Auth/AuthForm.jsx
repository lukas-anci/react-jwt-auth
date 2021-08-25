import { useState } from 'react';
import axios from 'axios';

import classes from './AuthForm.module.css';
import { apiKey } from './../../config';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log('sending form');
    setIsLoading(true);

    // take data and send to endpoint

    if (isLogin) {
      // Prijungti esama vartotoja
      console.log('Login action');
      setIsLoading(false);
      return;
    }
    if (!isLogin) {
      // Sukurti vartotoja
      console.log('Sign up action');
      console.log(email, password);
      // galima validacija

      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
          {
            email,
            password,
            returnSecureToken: true,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error.response.data.error.message);
        alert('Error ' + error.response.data.error.message);
      }
      setIsLoading(false);
      return;
    }

    // gauti email ir password
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form autoComplete="off" onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            value={email}
            onChange={emailHandler}
            type="email"
            id="email"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            value={password}
            onChange={passwordHandler}
            type="password"
            id="password"
            minLength="3"
            required
          />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <button disabled>Loading</button>
          ) : (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
