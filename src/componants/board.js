import React, { useState } from "react";
import Tile from "./Tile";
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from "../constants/boardConstants";
import { canSwap, shuffle, swap, isSolved } from "../helper/helper";

export default function board() {
  function Board({ imgUrl }) {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isSloved, setIsSolved] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    const shuffledTiles = () => {
      const shuffledTiles = shuffle(tiles);
      setTiles(shuffledTiles);
    };

    const swapTiles = (tileIndex) => {
      if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
        const swappedTiles = swap(
          tiles,
          tileIndex,
          tiles.indexOf(tiles.length - 1)
        );
        setTiles(swappedTiles);
      }
    };

    const handleStartClick = () => {
      shuffledTiles();
      setIsStarted(true);
    };

    const handleTileClick = (index) => {
      swapTiles(index);
    };

    const handleShuffleClick = () => {
      shuffledTiles();
      setIsStarted(true);
    };

    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
    const style = { width: BOARD_SIZE, height: BOARD_SIZE };
    const hasWon = isSolved(tiles);

    return (
      <div>
        <>
          <ul style={style} className="board">
            {tiles.map((tile, index) => (
              <Tile
                key={tile}
                index={index}
                imgUrl={imgUrl}
                tile={tile}
                width={pieceWidth}
                height={pieceHeight}
                handleTileClick={handleTileClick}
              />
            ))}
          </ul>
          {hasWon && isStarted && <div> CONGRATS PUZZLE COMPLETED </div>}
          {!isStarted ? (
            <button onClick={() => handleStartClick()}>Start Game</button>
          ) : (
            <button onClick={() => handleShuffleClick()}>Restart Game</button>
          )}
        </>
      </div>
    );
  }
}
