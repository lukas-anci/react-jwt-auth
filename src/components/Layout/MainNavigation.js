import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';
import { sendData } from './../../utils/http';

const MainNavigation = () => {
  // gauti isLogged in is context
  const [name, setName] = useState('');
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=';

  const getUsers = async () => {
    const token = await sendData(url, { idToken: authCtx.token });
    console.log('getUser', token.users[0].email);
    const email = token.users[0].email;
    setName(email);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && <li>{name}</li>}
          {isLoggedIn && (
            <li>
              <button onClick={authCtx.logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
