# Fruit-Frenzy
Fruit Frenzy is a tile matching game modeled on Candy Crush, using fruit instead of candy. Players can drag and drop fruits that are adjacent, but only if doing so creates a new cluster of three or more. Every time a swap is executed, an algorithm looks through the entire game board to find and remove new clusters(the fun never ends!).

Check out the live site [here](http://www.sarahwalloga.com/FruitFrenzy/)!


# Functionality

* Players click and drag to swap adjacent items
* Clusters of three or more fruits will disappear from the game board and add to the players score
* Players can view their score
* Players can restart the game

# Wireframe
This consists of a single page with game board, new game button and contact links.

Links include Github, LinkedIn, AngelList and email.

![wireframe](https://github.com/swalloga/FruitFrenzy/blob/master/images/ff_wireframe.png)


# Technologies:

* Javascript
  * Lodash
  * JQuery  
* HTML5
* Canvas
* CSS


# Challenges
As soon as the game board is rendered, it is filled with new, random fruit tiles. A function is immediately called to identify clusters of three or more tiles of the same fruit type. Cluster indices are identified and then each tile that is a part of a cluster is replaced with a null type tile and the canvas is cleared at that position. To fill the grid with new tiles after clusters are removed, I first iterate through the top row and replace any null tiles with new random fruit tiles. Then I iterate through the rest of the multidimensional array looking for null type tiles. If a the tile below the current tile is null type, I update the position of the current tile to be one row lower. This continues until the board contains no null type tiles.

```javascript
shiftTiles() {
  // while the board includes null,
  let gridHasNull = this.grid.flat().some((tile) => !tile.type);
  while (gridHasNull) {
    // iterate through first row, if it includes null, replace null with a new tile
    let firstRow = this.grid[0];
    for (let i = 0; i < firstRow.length; i++) {
      if (!firstRow[i].type) {
        this.addNewTile(0, i);
      }
    }
    // then iterate through the board
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[0].length; c++) {
        // if this row is the last row, continue on
        if (r + 1 === this.grid.length) {
          continue;
        }
        // if this isn't the last row, iterate through each item
        else {
          // if the current item is not null and the index at r + 1 is null
          let currentTile = this.grid[r][c];
          let tileBelow = this.grid[r + 1][c];
          // check if the tile below has type null
          if (!tileBelow.type) {
            this.incrementTile(r, c);
            // change the position of that tile to be one row lower
            this.grid[r + 1][c] = currentTile;
            currentTile.r = r + 1;
            this.addNullTile(r, c);
            this.updateTile(r + 1, c);
          }
        }
      }
    }
  gridHasNull = this.grid.flat().some((tile) => !tile.type);
  }
}
```
