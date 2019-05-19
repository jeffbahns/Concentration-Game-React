import React from 'react';
import Deck from './Deck';

// this class handles 
class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            deckID: null,
            deck: null,
            // gameOver: null,
            gameOver: true,
            isFetching: false,
        }
    }

    newGame = () => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    deckID: json.deck_id,
                    gameOver: false,
                    isFetching: true
                }, this.drawDeck);
            });
    }

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

    gameOver = () => {
        this.setState({ gameOver: true });
    }

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
