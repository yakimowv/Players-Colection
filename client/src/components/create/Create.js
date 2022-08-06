import './Create.css'

import React, { useContext, useState } from 'react'

import * as playersServices from '../../services/playersServices'
import { AuthContext } from '../../contexts/AuthContext'
import { PlayersContext } from '../../contexts/PlayersContext'
import { types, useNotificationContext } from '../../contexts/NotificationContext'

function Create() {
    const { addPlayer } = useContext(PlayersContext)
    const { addNotification } = useNotificationContext()
    const { user } = useContext(AuthContext)
    const tokken = user.accessToken

    const [player, setPlayer] = useState({
        name: '',
        nationality: '',
        position: '',
        image: '',
        description: '',
    })
    const createHandler = (e) => {
        e.preventDefault()
        setPlayer(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const formDataHandler = (e) => {
        e.preventDefault()
        if (player.name === '' ||
            player.nationality === '' ||
            player.position === '' ||
            player.image === '' ||
            player.description === '') {
            addNotification(`All field are required !`, types.error)
        } 
        if( !player.image.startsWith('http')){
            addNotification(`Image must start with http`, types.error)

        }else {
            playersServices.create(player, tokken)
                .then(result => {
                    addPlayer(result)
                })
                .catch(err => {
                    console.log(err)
                    addNotification(`${(err)}`, types.error)
                })
        }
    }

    return (
        <section id="create-page">
            <div className="create-player-card">

                <form method="POST" className="create-player" onSubmit={formDataHandler}>
                    <h2 className='create-title'>Add your favorite INTER player !</h2>
                    <ul className="noBullet">
                        <li>
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="input-place" id="name" placeholder="Two golden snub-nosed monkeys" name="name" value={player.name} onChange={createHandler} />
                        </li>
                        <li>
                            <label htmlFor="nationality">Nationality:</label>
                            <input type="text" className="input-place" id="nationality" placeholder="Bulgaria" name="nationality" value={player.nationality} onChange={createHandler} />
                        </li>
                        <li>
                            <label htmlFor="date">Position:</label>
                            <input type="text" className="input-place" id="position" placeholder="ST" name="position" value={player.position} onChange={createHandler} />
                        </li>
                        <li>
                            <label htmlFor="image">Player image:</label>
                            <input type="text" className="input-place" id="image" placeholder="http:/..." name="image" value={player.image} onChange={createHandler} />
                        </li>
                        <li>
                            <label htmlFor="description">More Info:</label>
                            <textarea id="description" className="input-place" name="description" placeholder="Player is..." value={player.description} onChange={createHandler}></textarea>
                        </li>
                        <li id="center-btn">
                            <button id="create-btn">Add</button>
                        </li>
                    </ul>
                </form>

            </div>
        </section>)
}

export default Create