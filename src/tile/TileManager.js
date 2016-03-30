import _ from 'lodash';


import TileView from 'tile/TileView';
import EventEmitter from 'external/EventEmitter';


const gap = 0.5;

function area(a, b, c)  {
    return Math.abs((a.x - c.x)*(b.y - c.y) + (b.x-c.x)*(c.y-a.y));
}

function getCornerCells(a, b, c, w, h) {
    let cells = [];
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            var d = {x: x + gap, y: y + gap};

            if (area(c, a, b) ===
                area(c, a, d) + area(c, d, b) + area(a, d, b)) {
                cells.push([x,y]);
            }
        }
    }

    return cells;
}


export default class TileManager extends EventEmitter {
    constructor(width = 14, height = 14) {
        super();


        /**
         * @type {Object}
         * @private
         */
        this._items = {};


        this.createTiles(width, height);
    }


    /**
     * @param {int} width
     * @param {int} height
     */
    createTiles(width, height) {
        var cellsToIgnore = [];

        for (var i = 0; i < width; i++) {
            this._items[i] = {};

            for (var j = 0; j < height; j++) {
                if (!_.some(cellsToIgnore, [i, j])) {
                    this._items[i][j] = this.createTile(i, j);
                }

            }
        }
    }


    /**
     * @param {int} x
     * @param {int} y
     * @returns {TileView}
     */
    createTile(x, y) {
        var tile = new TileView({x: x, y: y});
        tile.parent = this;

        return tile;
    }
}
