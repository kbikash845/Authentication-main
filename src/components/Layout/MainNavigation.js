import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../Store/auth-Context';

const MainNavigation = () => {
const authctx= useContext(AuthContext);

const isLonggedIn=authctx.isLonggedIn

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLonggedIn && (<li>
            <Link to='/auth'>Login</Link>
          </li> )}
          {isLonggedIn && (<li>
            <Link to='/profile'>Profile</Link>
          </li>)}
          
          {isLonggedIn && (<li>
            <button>Logout</button>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
