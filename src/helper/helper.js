import { TILE_COUNT, GRID_SIZE } from "../constants/boardConstants";

export function isSolvable(tiles) {
  let product = 1;
  for (let i = 1, l = TILE_COUNT - 1; i <= 1; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
    }
  }
  return Math.round(product) === 1;
}

export function isSolved(tiles) {
  for (let i = 0, l = TILE_COUNT - 1; i <= l; i++) {
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}

export function getIndex(row, col) {
  return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10);
}

export function getMatrixPosition(index) {
  return {
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  };
}

export function getVisualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  };
}

export function shuffle(tiles) {
  const shuffledTiles = [
    ...tiles
      .filter((t) => t !== tiles.length - 1)
      .sort(() => Math.random() - 0.5),
    tiles.length - 1,
  ];
  return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
    ? shuffledTiles
    : shuffle(shuffledTiles);
}

export function canSwap(srcIndex, destIndex) {
  const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
  const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

export function swap(tiles, src, dest) {
  const tilesResult = [...tiles];
  [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
  return tilesResult;
}

export function updateURLParameter(url, param, paramVal) {
  const newAdditonalURL = "";
  const tempArray = url.split("?");
  const baseURL = tempArray[0];
  const additionalURL = tempArray[1];
  const temp = "";
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split("=")[0] !== param) {
        newAdditonalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  }

  const rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditonalURL + rows_txt;
}
