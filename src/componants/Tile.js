import React from "react";
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from "../constants/boardConstants";
import { getMatrixPosition, getVisualPosition } from "../helper/helper";

export default function Tile(props) {
  const { Tile, index, width, height, handleTileClick, imgURL } = props;
  const { row, col } = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${BOARD_SIZE * 1.25}px`,
    backgroundposition: `${(100 / GRID_SIZE) * (tile % GRID_SIZE)}% ${
      (100 / GRID_SIZE) * Math.floor(tile / GRID_SIZE)
    }%`,
  };
  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y),
  };

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translatedX}px, ${translateY}px, 0)`,
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
          }}
          className="tile"
          onClick={() => handleTileClick(index)}
        >
          {!imgUrl && `${tile + 1}`}
        </li>
      )}
    </Motion>
  );
}
