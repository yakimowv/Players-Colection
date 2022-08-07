import './Details.css'

import React, { useContext, useEffect,} from 'react'
import { Link,useNavigate, useParams} from 'react-router-dom'


import { useNotificationContext, types } from '../../contexts/NotificationContext'
import { useAuthContext } from '../../contexts/AuthContext'
import { PlayersContext} from '../../contexts/PlayersContext'
import * as playerServices from '../../services/playersServices'
import * as likeServices from '../../services/likeServices'



function Details() {
    const { user } = useAuthContext()
    const { addNotification } = useNotificationContext()
    const { selectPlayer, deletePlayer,likePlayer,fetchPlayerDetails } = useContext(PlayersContext)
    const { playerId } = useParams()
    const navigate = useNavigate()
    
    const userId=user._id
    const currentPlayer = selectPlayer(playerId)

    const isOwner = Boolean(currentPlayer._ownerId === userId)
    const isLke =Boolean(currentPlayer.likes?.includes(user._id))
   
    useEffect(()=>{
        (async () => {
            try{
                const playerData = await playerServices.getOne(playerId);
                const playerLikes = await likeServices.getPlayerLikes(playerId);
                fetchPlayerDetails(playerId,{...playerData,likes:playerLikes.map(x=>x.userId)})     
            }catch(err){
                navigate('/404')
                console.log(err)
            }
            })();
    },[])

    const likeBtnHandler =(e)=>{
        e.preventDefault()
        if (isOwner) {
            return;
        }
        if (currentPlayer.likes.includes(user._id)) {
            addNotification('You cannot like again')
            return;
        }
        likeServices.like(playerId,userId)
        .then(result=>{
            likePlayer(playerId,userId)
        })
        .catch(err=>{
            addNotification(err, types.error)
        })
    }



    const gameDeleteHandler = () => {
        const confirmation = window.confirm(`Are you sure you want to DELETE this PLAYER: ${currentPlayer.name}?`);

        if (confirmation) {
            playerServices.deletPlayer(playerId)
                .then(() => {
                    deletePlayer(playerId);
                    navigate('/my-profile')
                    
                })
                .catch(err => {
                    addNotification(err, types.error)
                })
        }
    }



    return (
        <section id="details-page">

            <div className="head-card">
                <div className="card-from-left">
                    <div className="card-datails">

                        <h1>Name: {currentPlayer.name}</h1>
                        <div className="card-player">
                            <p className="card-nationality">Nationality: {currentPlayer.nationality}</p>
                            <p className="card-position">Position: RB</p>
                        </div>

                        <p className="disc">Description: {currentPlayer.description}</p>

                        <div className="social-btn">


                        {userId && (userId === currentPlayer._ownerId
                            ? <>
                            <Link to={`/edit/${currentPlayer._id}`} className="edit-btn">Edit</Link>
                            <Link to={`/delete/${currentPlayer._id}`} onClick={gameDeleteHandler} className="del-btn">Delete</Link>
                                </>
                            : isLke
                            ?<p className="thanks-for-like">Thanks For The Like</p>
                            :<Link to="/likes" className="like-btn" onClick={likeBtnHandler}>Like</Link>
                            
                             )}
                                                    
                            <div className="likes">
                                <img className="hearts" src="/images/heart.png" alt='heart' />
                                <span id="total-likes">Likes: {currentPlayer.likes?.length || 0}</span>
                            </div>
                         
                        </div>
                    </div>
                </div>
                <div className="card-right">
                    <img src={currentPlayer.image} alt="player" />
                </div>
            </div>

        </section>
    )
}

export default Details
