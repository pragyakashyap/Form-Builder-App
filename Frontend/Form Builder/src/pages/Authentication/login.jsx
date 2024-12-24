import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
import styles from "./authentication.module.css"

const Login = () => {
  return (
    <>
    <div className={styles.login}>
        
         <FontAwesomeIcon icon={faArrowLeft} /> 
         
         <form>
            <label>Email</label>
            <input 
            type="email"
            name="email"
            placeholder="Enter your email"
            />
            <label>Password</label>
            <input
            type='password'
            name='password'
            placeholder='**********'
            />
            <button type='submit' className={styles.loginButton}>Log in</button>
            <div className={styles.loginOption}>OR</div>
         <button className={styles.loginGoogle}>
            <div style={{borderRadius:'50%',backgroundColor:'white',padding:'2px',width:'20px',height:'20px',}}><img style={{marginTop:'3px',objectFit:'contain',width:'15px'}} src="Google Icon.png"/></div>
            <span style={{marginLeft:'25%'}}>Sign In with Google</span>
        </button>
        <div className={styles.loginRegister}><p>Don’t have an account? <span>Register now</span></p></div>
         </form>
       
    </div>
     <div className={styles.triangle}>
     <img src='Group 2.png'/>
     </div>
     <div className={styles.ellipse1}>
     <img src='Ellipse 1.png'/>
     </div>
     <div className={styles.ellipse2}>
     <img src='Ellipse 2.png'/>
     </div>
     </>
  )
}

export default Login