import { useState,useRef, useContext} from 'react';
// import { useHistory } from 'react-router';
import { useNavigate } from "react-router-dom";
import classes from './AuthForm.module.css';
import AuthContext from '../../Store/auth-Context';


const AuthForm = () => {
  // const history=useHistory();
  const navigate = useNavigate();
  const EmailInputRef=useRef()
  const PasswordRef=useRef()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoadindg,setLoading]=useState(false)


  const authctx=useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
   event.preventDefault();
   const enterEmail=EmailInputRef.current.value;
   const enterPassword=PasswordRef.current.value;

   setIsLogin(true)
    let url;
   if(isLogin){
    url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQMtQ6DA9lUfmFoZc9T2YMwBI6vx_790Q"
   }else{
    url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQMtQ6DA9lUfmFoZc9T2YMwBI6vx_790Q'
 
   }
   fetch(url,
     {
     method:"POST",
     body:JSON.stringify({
       email:enterEmail,
       password:enterPassword,
       returnSecureToken:true,
     }),
     headers:{
      'Content-Type': 'application/json'
     },
   }
   ).then((res)=>{
     setLoading(false)
     if(res.ok){
      return res.json()
      }else{
       return res.json().then((data)=>{
         let errormassage="Authentication failed";
        // if(data && data.error && data.error.message){
        //  errormassage=data.error.message
        // }
         
          throw new Error(errormassage)
       });

     }
   }).then((data)=>{
    // console.log(data)
    authctx.login(data.idToken)
    // history.push('/')
    navigate("/");

    console.log(authctx.login(data.idToken));
   }).catch((err)=>{
    alert(err.message)
   })

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={EmailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={PasswordRef}
          />
        </div>
        <div className={classes.actions}>
        { !isLoadindg && <button >{isLogin ? "Login" : "Create Account"}</button>}
          { isLoadindg &&<p>Sending request...</p>}
          <button
            type='button'
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
