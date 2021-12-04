import { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import toast from 'react-hot-toast'

import { UserContext } from '../auth/AuthLayer'
import { TOKEN_AUTH } from '../../gql/mutations/tokenAuth'

function Login() {
    const [isLoginForm, setIsLoginForm] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const { user, setUser } = useContext(UserContext)

    let location = useLocation();
    const history = useHistory()

    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => {
        if (user.username) {
            history.push(from)
        }
    })

    const [tokenAuth, {loading}] = useMutation(TOKEN_AUTH, {
        onCompleted: ((data) => {
            localStorage.setItem("accessToken", data.tokenAuth.token)
            localStorage.setItem("refreshToken", data.tokenAuth.refreshToken)
            setUser(data.tokenAuth.user)
            toast.success("Успешная авторизация")
            localStorage.setItem("reloaded", false)
            if (data.tokenAuth.user.type == 'startup') {
                history.push("/my")
            }
        }),
        onError: (error => {
            console.log(error)
            toast.error(
                error.message == "Please enter valid credentials" ?
                "Введены неверные логин или пароль" :
                "Произошла ошибка"
            )
        })
    })

    return (
        <div className="login_container">
            {/* <div>
                <h2 className="text-center">Кто вы?</h2>
                <div className="d-flex">
                    <div 
                        className="login_card"
                    >
                        <h2>Стартапер</h2>  
                    </div>
                    <div 
                        className="login_card"
                        onClick={() => {
                            setUser({...user, type: "expert"})
                            localStorage.setItem("type", "expert")
                            history.push("/")
                        }}
                    >
                        <h2>Эксперт компании INNO-TIM</h2>  
                    </div>
                    <div 
                        className="login_card"
                        onClick={() => {
                            setUser({...user, type: "director"})
                            localStorage.setItem("type", "director")
                            history.push("/")
                        }}
                    >
                        <h2>Функциональный директор</h2>  
                    </div>
                </div>
            </div> */}
            <form onSubmit={(e) => {
                    e.preventDefault()
                    tokenAuth({
                        variables: {username, password}
                    })
                }}>
                    <input
                        type="text"
                        className="defaultInput w-100"
                        placeholder="Логин"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="defaultInput w-100 mt-2"
                        placeholder="Пароль"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="defaultBtn loginBtn mt-2"
                        disabled={loading}
                    >
                        Войти в систему
                    </button>
                </form>
        </div>  
    )
}

export default Login