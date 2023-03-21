import { useState, useEffect } from "react"
import { usePostLoginMutation, usePostSignUpMutation } from "../../state/api"

const Login = ({ setUser, setSecret }) => {
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [triggerLogin, resultLogin] = usePostLoginMutation()
    const [triggerSignUp, resultSignup] = usePostSignUpMutation()
    const [error, setError] = useState(false)

    const handleLogin = () => {
        triggerLogin({ username, password })
    }

    const handleRegister = () => {
        triggerSignUp({ username, password })
    }

    const handleOptions = () => {
        error ? setError("") : ''
        setIsRegister(!isRegister)
    }

    useEffect(() => {
        if(resultLogin.data?.response) {
            setUser(username)
            setSecret(password)
        } else if(resultSignup.data?.response) {
            setUser(username)
            setSecret(password)
        } else if(resultLogin?.isError) {
            setError("Login")
        } else if(resultSignup?.isError) {
            setError("Register")
        }
        
    }, [resultLogin.data, resultSignup.data, resultLogin.isError])

  return (
    <div className="login-page">
        <div className="login-container">
            <h2 className="title">CHATGPT APP</h2>
            <p className="register-change" onClick={() => handleOptions()}>
                {isRegister ? "Already a user?" : "Are you a new user?"}
            </p>
            <div>
                <input 
                    className="login-input" 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value) }
                />
                 <input 
                    className="login-input" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value) }
                />
            </div>
            <div 
                className="login-actions">
                    {isRegister ? (
                        <button type="button" style={{ borderRadius: '1rem', border: '0px' }} onClick={handleRegister}>
                            Register
                        </button>
                    ) : (
                        <button type="button" style={{ borderRadius: '1rem', border: '0px' }} onClick={handleLogin}>
                            Login
                        </button>
                    )}  
            </div>
            {error ? (
                <>
                    <p style={{ color: 'red' }}>{error} Failed!</p>
                    <p>Please check your username and password.</p>
                </>
            ) : <></>}
        </div>
    </div>
  )
}

export default Login