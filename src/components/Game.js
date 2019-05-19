import React from 'react';
import Deck from './Deck';

// this class handles 
class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            deckID: null,
            deck: null,
            gameOver: null,
            isFetching: false,
        }
    }

    // runs after button clicked, grabs a new deckID and adjusts state, then calls the drawDeck()
    newGame = () => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        deckID: json.deck_id,
                        gameOver: false,
                        isFetching: true
                    }, this.drawDeck);
                }
            });
    }

    // draws a deck from the API based on a deckID
    drawDeck = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=52`)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({ 
                        deck: json.cards, 
                        isFetching: false 
                    });
                }
            });
    }

    // called from deck, just flips the state to true
    gameOver = () => {
        this.setState({ gameOver: true });
    }

    // determines if the deck should be shown on screen 
    showDeck = () => {
        return this.state.deck && !this.state.isFetching && !this.state.gameOver;
    }

    render() {
        return (
            <div>
                <div id="game-header" className="row App-header">
                    <div className="col-3"></div>
                    <div className="col-6">CONCENTRATION</div>
                    <div className="col-3">
                        <button id="new-game" onClick={this.newGame}>New Game</button>
                    </div>
                </div>
                
                {this.showDeck() ? 
                    <Deck 
                        deckID={this.state.deckID} 
                        deck={this.state.deck} 
                        gameOver={this.gameOver} 
                    /> 
                    : ''
                }
                
                {this.state.gameOver ? 
                    <div id="game-over">
                        You won! Play again?
                    </div>
                    : ''
                }
            </div>
        );
    }
}

export default Game;
