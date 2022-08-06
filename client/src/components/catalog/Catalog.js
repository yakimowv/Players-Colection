import "./Catalog.css";

import React, { useContext } from "react";

import CatalogCard from "./CatalogCard";
import { PlayersContext } from "../../contexts/PlayersContext";

function Catalog() {
  const { players } = useContext(PlayersContext);

  return (
    <section id="catalog">
      <h1 className="catqalog-title">Best INTER players</h1>
      <div className="section">
        {players.length > 0 ? (
          players.map((x) => <CatalogCard key={x._id} player={x} />)
        ) : (
          <div className="no-players">
          <img src="images/internazionale_corpo.jpg" />
          <p className="no-player-text">No players here!...</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Catalog;
