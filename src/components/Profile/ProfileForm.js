import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/auth-Context';

const ProfileForm = () => {
  const newPasswordInputRef=useRef()
  
   const authCtx=useContext(AuthContext)
  const submitHandler=(event)=>{
   event.preventDefault();
   const enternewPassword=newPasswordInputRef.current.value;

   fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBQMtQ6DA9lUfmFoZc9T2YMwBI6vx_790Q',{
    method:"POST",
    body:JSON.stringify({
      idToken:authCtx.token,
      password:enternewPassword,
      returnSecureToken:false
    }),
    headers:{
      'Content-Type':'application/json'
    },

   }).then((res)=>{
      /// assumption password succes
   })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password'  ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
