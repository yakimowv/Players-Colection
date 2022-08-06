import React, { useContext } from 'react'
import './MyProfile.css'
import { PlayersContext } from '../../contexts/PlayersContext'
import { useAuthContext } from '../../contexts/AuthContext'
import MyProfileCard from './MyProfileCard'

function MyProfile() {
    const{myProfile}=useContext(PlayersContext)
    const {user}=useAuthContext()
    const userId=user._id
    const myPlayers=myProfile(userId)
  return (
<section id="my-profile">
    <h1 className='my-profile-title'>My Profile: {user.username}</h1>
    <div className="background">

            {myPlayers.length > 0
            ? myPlayers.map(x => <MyProfileCard key={x._id} player={x} />)
            :<><div className="no-players">
            <img src="images/internazionale_corpo.jpg" />
            <p className="no-player-text">No players here!...</p>
            </div></>}
        
     
    </div>
</section>
  )
}

export default MyProfile