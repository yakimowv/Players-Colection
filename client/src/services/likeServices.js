import * as request from './requester';

const baseUrl='http://localhost:3030/data/likes'

export const like = (playerId,userId) => request.post(baseUrl, {playerId,userId});

export const getPlayerLikes = (playerId) => {
    const query = encodeURIComponent(`playerId="${playerId}"`);

    return request.get(`${baseUrl}?select=userId&where=${query}`)
};