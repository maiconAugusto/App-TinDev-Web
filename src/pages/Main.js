import React,{ useEffect, useState} from 'react'
import './main.css'
import logo from  '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import axios from 'axios'
import io from 'socket.io-client'

export default function Main({match}){
    const [ users,setUsers ] = useState([])
    useEffect(()=>{
        async function handlerIndex(){
            const response = await axios.get('http://192.168.2.88:8880/devs',{
                headers:{
                    user: match.params.id,
                }
            })
            setUsers(response.data)
        }
        handlerIndex()
        
    },[match.params.id])

    useEffect(()=>{
        const socket = io('http://localhost:8880',{
            query:{
                user: match.params.id
            }
        })
        socket.on('match',dev=>{
            console.log(dev)
        })
        
    },[match.params.id])

    async function handleLike(element){
        console.log(element)
        const response = await axios.post(`http://192.168.2.88:8880/devs/${element}/likes`,null,{
            headers:{
                user: match.params.id
            }
        })
        console.log(response.data)
        setUsers(users.filter(user=> user._id !== element))
    }
    async function handleDislike(element){
        console.log(element)
        const response = await axios.post(`http://192.168.2.88:8880/devs/${element}/deslike`,null,{
            headers:{
                user: match.params.id
            }
        })
        setUsers(users.filter(user=> user._id !== element))
    }
    return(
        <div className="container-main">
                <header className='container-header'>
                    <img src={logo} alt="TindDev"/>
                </header>
                    <ul className="container-item">
                        {users.length === 0 ? <div className='theEnd'><h3>Acabou :(</h3></div>
                        : users.map(function(element){
                            const { _id } = element
                            return(
                                <li key={element._id} className='card'>
                                    <img  src={element.avatar}/>
                                    <footer className='container-footer'>
                                        <strong>{element.name}</strong>
                                        <p>{element.bio}</p>
                                    </footer>
                                    <div className="buttons">
                                        <button type="button" onClick={()=> handleLike(_id)}>
                                            <img src={like} alt="like"/>
                                        </button>
                                        <button type="button" onClick={()=> handleDislike(_id)}>
                                            <img src={dislike} alt='dislike'/>
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                        }
                    </ul>
        </div>
    )
}