import React, {useState} from 'react'
import '../CSS/auth.css'

export default function Register({checkUser, rer}) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    function submitHandler(event) {
        event.preventDefault()
        if (login.trim() && password.trim()) {
            console.log(checkUser(login, password))
            setLogin('')
            setPassword('')
            rer()
        }
    }
    return (
        <>
            <form className='auth' onSubmit={submitHandler}>
                <h2>Логинимся!</h2>
                <input placeholder="Логин" value={login} onChange={event => {setLogin(event.target.value)}}/>
                <input placeholder="Пароль" value={password} onChange={event => {setPassword(event.target.value)}}/>
                <button type="submit">Войти</button>
            </form>
        </>
    )
}