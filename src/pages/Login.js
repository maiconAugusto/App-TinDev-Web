import React, { useState} from 'react'
import logo from  '../assets/logo.svg'
import './Login.css'
import axios from 'axios'



export default function Login({history}){

    const[ username, setUsername ]= useState('')

    async function handleSubmit(event){
        event.preventDefault()
       if(username === null || username === '' || username === NaN || username === undefined) return alert('ATENÇÃO! \nINFORME SEU USUÁRIO!')
       else{
        const response = await axios.post('http://192.168.2.88:8880/devs/', {
            username
        })
        
        const { _id } = response.data.checkUser
       history.push(`/dev/${_id}`)
       }
    }
    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img  src={logo} alt="TindDev"/>
                <input
                 placeholder="Digite seu usuário do GitHub"
                 value={username}
                 onChange={(event )=> setUsername(event.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}