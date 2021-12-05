import React, {useState} from 'react'
export default function Register({createUser, rer}) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    function submitHandler(event) {
        event.preventDefault()
        if (login.trim() && password.trim()) {
            console.log(createUser(login, password))
            setLogin('')
            setPassword('')
            rer()
        }
    }
    return (
        <>
            <form className='auth' onSubmit={submitHandler}>
                <h2>Регаемся!</h2>
                <div className='form-group'>
                    <label htmlFor="login">Логин</label>
                    <input type='login' className='form-control' id='login' placeholder="Введите логин..." value={login} onChange={event => {setLogin(event.target.value)}}/>
                </div>
                <div className='form-group'>
                <label htmlFor="passwd">Пароль</label>
                    <input type='password' className='form-control' id='passwd' placeholder="Введите пароль..." value={password} onChange={event => {setPassword(event.target.value)}}/>
                </div>
                <button className='btn btn-primary' type="submit">Регистрация</button>
            </form>
        </>
    )
}