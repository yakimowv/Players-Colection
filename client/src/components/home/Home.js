import './Home.css'

import React from 'react'


function Home() {
    return (
        <>
            <section id="home">
                <div className="home-place">
                    <div className="short-info">
                        <h1>SHOW US YOUR FAVORITE PLAYER</h1>
                    </div>
                </div>
            </section>
            <section id="home-player-page">

                <div className="players">
                    <div className="player image"><img src="images/Z4.jpg" alt='Zanetti' /></div>
                    <div className="player image"><img src='images/E9.jpg' alt='Eto o' /></div>
                    <div className="player image"><img src="images/M7.jpg" alt='Meaca' /></div>
                </div>
            </section>
        </>
    )
}

export default Home