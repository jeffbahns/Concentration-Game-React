import React from 'react';
import Card from './Card';

class Deck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deckID: props.deckID,
            deck: props.deck,
            cardsFlipped: [],
            isFetching: false,
        }
    }

    // checks for a game over scenario, when all cards in the deck have a solved state
    checkIfGameOver = () => {
        let deck = this.state.deck.filter(card => !card.solved);
        if (deck.length === 0) {
            this.props.gameOver();
        }
    }

    // checks if cards are matched, then sends them to either a solved state or flips back over again
    checkIfMatch = () => {
        let cardsFlipped = JSON.parse(JSON.stringify(this.state.cardsFlipped));
        if (cardsFlipped.length !== 2) { return; }

        let deck = JSON.parse(JSON.stringify(this.state.deck));

        let card1 = deck[cardsFlipped[0]];
        let card2 = deck[cardsFlipped[1]];

        if (card1.value === card2.value) { // match success
            card1.solved = true;
            card2.solved = true;

        } else { // no match, flip em back over
            card1.flipped = false;
            card2.flipped = false;
        }
        cardsFlipped = [];

        // timeout so user can check cards before they are flipped back
        setTimeout(() => {
            this.setState({ deck, cardsFlipped }, this.checkIfGameOver);
        }, card1.solved ? 300 : 1500);
    }

    // click handler for all cards on screen
    cardClicked = (cardIndex) => {
        // dont let user flip more than two cards at a time
        if (this.state.cardsFlipped.length >= 2) { return; }

        let deck = JSON.parse(JSON.stringify(this.state.deck));
        deck[cardIndex].flipped = true;

        let cardsFlipped = JSON.parse(JSON.stringify(this.state.cardsFlipped));
        if (cardsFlipped.length < 2) {
            cardsFlipped.push(cardIndex);
        }

        // after card flipped, check if there is a match with another
        this.setState({ deck, cardsFlipped }, this.checkIfMatch);
    }

    // ugly but functional solution for creating a deck
    // basically a double nested map that creates a grid
    renderDeck = () => {
        return Array(4).fill(0).map((e, i) => {
            return (
                <div key={`row ${i}`} className="row card-row">
                    {Array(13).fill(0).map((e2, j) => {
                        let card = this.state.deck[i * 13 + j];
                        return (
                            <div key={card.code} className="col">
                                <Card
                                    i={i * 13 + j}
                                    card={card}
                                    showCard={this.cardClicked}
                                />
                            </div>
                        );
                    })}
                </div>
            );
        });
    }

    render() {
        return (
            <div id="deck">
                {this.renderDeck()}
            </div>
        );
    }

}

export default Deck;
