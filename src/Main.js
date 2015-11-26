import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import TileManager from 'tile/TileManager';
import CardManager from 'card/CardManager';
import TileCardManager from 'TileCardManager';
import Backend from 'Backend';


/**
 * Main class of game.
 */
class Main {
    constructor() {
        /**
         * type {TileManager}
         * @private
         */
        this._tileManager = null;


        /**
         * type {CardManager}
         * @private
         */
        this._cardManager = null;


        /**
         * type {TileCardManager}
         * @private
         */
        this._tileCardManager = null;


        PhaserWrapper.createFinished = this._init;
    }


    _init() {
        this._tileManager = new TileManager();
        this._cardManager = new CardManager();
        this._tileCardManager = new TileCardManager();

        this._loadSavedGame();
    }


    _loadSavedGame() {
        var cards = Backend.getCards();
        cards.forEach(function(cardData) {
            this._cardManager.createCard(cardData);
        }.bind(this));
    }
}

new Main();
