import './Edit.css'

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PlayersContext } from '../../contexts/PlayersContext'
import *as playersServices from '../../services/playersServices'
import { useNotificationContext, types } from '../../contexts/NotificationContext'

function Edit() {
    const navigate = useNavigate()
    const { addNotification } = useNotificationContext()
    const [player, setPlayer] = useState({
        name: '',
        nationality: '',
        position: '',
        image: '',
        description: '',
    })
    const { editPlayer } = useContext(PlayersContext)
    const { playerId } = useParams()
    useEffect(() => {
        playersServices.getOne(playerId)
            .then(playerData => {
                setPlayer(playerData)
            })
            .catch(err => {
                addNotification(err, types.error)
            })
    }, [])
    const editHandler = (e) => {
        e.preventDefault()
        setPlayer(oldGame => ({
            ...oldGame,
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
        } else {

            playersServices.edit(playerId, player)
                .then(result => {
                    editPlayer(playerId, result)
                    navigate(`/best-players`)
                })
                .catch(err => {
                    addNotification(err, types.error)
                })
        }
    }



    return (
        <section id="edit-page">
            <div className="edit-section">

                <form method="POST" className="edit-form" onSubmit={formDataHandler}>
                    <h2 className='edit-title'>Edit your favorite INTER player !</h2>
                    <ul className="noBullet">
                        <li>
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="input-place-edit" id="name" placeholder="Two golden snub-nosed monkeys" name="name" value={player.name} onChange={editHandler} />
                        </li>
                        <li>
                            <label htmlFor="nationality">Nationality:</label>
                            <input type="text" className="input-place-edit" id="nationality" placeholder="Bulgaria" name="nationality" value={player.nationality} onChange={editHandler} />
                        </li>
                        <li>
                            <label htmlFor="date">Position:</label>
                            <input type="text" className="input-place-edit" id="position" placeholder="Midfilder" name="position" value={player.position} onChange={editHandler} />
                        </li>
                        <li>
                            <label htmlFor="image">Player image:</label>
                            <input type="text" className="input-place-edit" id="image" placeholder="http:/..." name="image" value={player.image} onChange={editHandler} />
                        </li>
                        <li>
                            <label htmlFor="description">More Info:</label>
                            <textarea id="description" className="input-place-edit" name="description" placeholder="Player is..." value={player.description} onChange={editHandler}></textarea>
                        </li>
                        <li id="center-btn">
                            <button id="create-btn">Edit</button>
                        </li>
                    </ul>
                </form>

            </div>
        </section>
    )
}

export default Edit