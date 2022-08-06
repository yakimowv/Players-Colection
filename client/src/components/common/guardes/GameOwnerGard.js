import { useContext } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";

import { useAuthContext } from "../../../contexts/AuthContext";
import { PlayersContext } from "../../../contexts/PlayersContext";

const GameOwnerGard = ({ children }) => {
  const { selectPlayer } = useContext(PlayersContext);
  const { user, isAuthenticated } = useAuthContext();
  const { playerId } = useParams();

  const curruntPlayer = selectPlayer(playerId);
  if (isAuthenticated && user._id !== curruntPlayer._ownerId) {
    return <Navigate to="/404" replace />;
  }

  return children ? children : <Outlet />;
};

export default GameOwnerGard;
