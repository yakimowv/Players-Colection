import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import * as playersServices from '../services/playersServices'


export const PlayersContext = createContext()

const playerReducer = (state, action) => {
    switch (action.type) {
        case 'ALL_PLAYERS':
            return action.payload.map(x => ({ ...x, likes: [] }));

        case 'ADD_PLAYER':
            return [...state, action.payload];
           
        case 'FETCH_PLAYER_DETAILS':
        case 'EDIT_PLAYER':
            return state.map(x => x._id === action.playerId ? action.payload : x);

        case 'DELETE_PLAYER':
            return state.filter(x => x._id !== action.playerId);

        case 'LIKE_PLAYER':
            return state.map(x => x._id === action.playerId ? { ...x, likes: [...x.likes, action.payload] } : x); 

        default:
            return state
    }
}

export const PlayersProvider = ({ children }) => {
    const [players, dispatch] = useReducer(playerReducer, [])
    const navigate = useNavigate()


    const myProfile =(userId)=>{
        return players.filter(x=> x._ownerId === userId)||[]
    }

    const searchPlayer =(text)=>{
        return players.filter(x=>x.name.toLowerCase().includes(text.toLowerCase()))
    }


    const selectPlayer = (playerId) => {
        return players.find(x => x._id === playerId) || {};
    };


    useEffect(() => {
        playersServices.getAll()
            .then(result => {
                const action = {
                    type: 'ALL_PLAYERS',
                    payload: result
                }
                dispatch(action);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const addPlayer = (playerData) => {
        dispatch({
            type: 'ADD_PLAYER',
            payload: playerData,
        });
        navigate('/best-players')
    }

    const editPlayer = (playerId, playerData) => {
        dispatch({
            type: 'EDIT_PLAYER',
            payload: playerData,
            playerId,
        })
    }
    const deletePlayer = (playerId) => {
        dispatch({
            type: 'DELETE_PLAYER',
            playerId
        })
    }
  
    const fetchPlayerDetails = (playerId, playerDetails) => {
        dispatch({
            type: 'FETCH_PLAYER_DETAILS',
            payload: playerDetails,
            playerId,
        })
    }
    const likePlayer =(playerId,userId)=>{
        dispatch({
            type: 'LIKE_PLAYER',
            payload:userId,
            playerId
        })
    }

    return (
        <PlayersContext.Provider value={{
            players,
            addPlayer,
            selectPlayer,
            editPlayer,
            deletePlayer,
            myProfile,
            fetchPlayerDetails,
            likePlayer,
            searchPlayer

        }}>
            {children}
        </PlayersContext.Provider>
    )
}