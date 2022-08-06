import './Register.css'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import * as authService from '../../services/userServices'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNotificationContext, types } from '../../contexts/NotificationContext'

function Register() {
    const navigate = useNavigate()
    const { addNotification } = useNotificationContext()
    const { login } = useAuthContext()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        repas: ''
    })

    const createUser = (e) => {
        e.preventDefault()
        setUser(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const username = user.username
        const email = user.email
        const password = user.password

        if (password !== user.repas) {
            addNotification(`Passwords must be equal`, types.error)
        } 
        if (username === '' || email === '' || password === '') {
            addNotification(`All fields are required!`, types.error)
        } else {
            authService.register(username, email, password)
                .then(userData => {
                    login(userData)
                    navigate('/')
                })
                .catch(err => {
                    addNotification(err, types.error)
                })
        }
    }

    return (
        <section id="register-page">
            <div className="register-section">
                <div className="register-info">
                    <h2>Join the nerazzurri family</h2>
                </div>
                <form onSubmit={submitHandler} method="POST" className="signupForm">
                    <h2>Sign Up</h2>
                    <ul className="register-li">
                        <li>
                            <label htmlFor="username">Username:</label>
                            <input type="text" className="login-Fields" id="username" name="username" value={user.username} onChange={createUser} placeholder="nerrazzurio..." />
                        </li>
                        <li>
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="login-Fields" id="email" name="email" value={user.email} onChange={createUser} placeholder="alex@gmail.com" />
                        </li>
                        <li>
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="login-Fields" id="password" value={user.password} onChange={createUser} name="password" placeholder="******" />
                        </li>
                        <li>
                            <label htmlFor="repeat-password">Repeat-Password:</label>
                            <input type="password" className="login-Fields" id="repeat-password" value={user.repas} onChange={createUser} name="repas" placeholder="******" />
                        </li>

                        <li>
                            <button id="register-btn">Join</button>
                        </li>
                    </ul>
                </form>
            </div>
        </section>
    )
}

export default Register

