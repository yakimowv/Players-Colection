import React, { useContext, useState } from 'react'
import './Search.css'
import { PlayersContext } from '../../contexts/PlayersContext'
import SearchCard from './SearchCard'

function Search() {
const [text,setText]=useState('')
const [value,setValue]=useState([])
const{ searchPlayer }=useContext(PlayersContext)

const onSearchChange =(e)=>{
e.preventDefault()
setText(e.target.value)
}

const textSubmit=(e)=>{
    e.preventDefault()
    const result =searchPlayer(text)
    if(result.length === 0){
        setValue([])
    }else{
        setValue(result)
        setText('')
    }
}

console.log(value)
return <>
            <form className="search" onSubmit={textSubmit}>
                <input type="search" id="button" name="text" onChange={onSearchChange} value={text} placeholder="Search here..."/>
                <button type="submit">Search</button>
            </form>
              <section id="find-section">
                <div className="no-data-listing">

                    {value.length > 0
                    ?value.map(x => <SearchCard key={x._id} value={x} />)
                    :(<div class="no-players">
                    <img src="images/internazionale_corpo.jpg" />
                    <p class="no-player-text">No Found!...</p>
                    </div>)}
                    
                     </div>
              </section>
        </>
  
}

export default Search