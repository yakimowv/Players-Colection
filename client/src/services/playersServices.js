import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/players';

export const getAll = () => request.get(baseUrl);

export const getOne = (playerId) => request.get(`${baseUrl}/${playerId}`);

export const create = (playerData) => request.post(baseUrl, playerData);

export const edit = (playerId, playerData) => request.put(`${baseUrl}/${playerId}`, playerData);

export const deletPlayer = (playerId) => request.del(`${baseUrl}/${playerId}`);
