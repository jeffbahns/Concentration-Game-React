import React from 'react';


const Card = (props) => {
    return (
        props.card.showing ? (
            <div style={{ width: '80px', height: '100px', opacity: props.card.solved ? '0.2' : '1' }}>
                <img
                    src={props.card.image}
                    // 
                    alt="new"
                    height="100"
                    width="80"
                />
                {/* {props.card.solved ? 'solved' : props.card.value} */}
            </div>
        ) : (
            <div onClick={() => props.showCard(props.i)}
                style={{ width: '80px', height: '100px' }}
            >
                <img
                    src="https://previews.123rf.com/images/bobyramone/bobyramone1206/bobyramone120600016/14167526-playing-card-back-side-60x90-mm.jpg"
                    alt="new"
                    height="100"
                    width="80"
                />
            </div>
        )
    );
}

class Deck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deck: [],
            showing: []
        }
        
        // this.newGame();
    }

    newGame = () => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    deckID: json.deck_id
                }, this.buildDeck);
            });
    }

    buildDeck = () => {
        console.log(this.state.deckID + ' building deck!');
        let url = `https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=52`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(json => {

                if (json.success) {
                    this.setState({ deck: json.cards })
                }
            });
    }

    getCard = (i) => {

    }

    checkIfMatch = () => {
        let showing = JSON.parse(JSON.stringify(this.state.showing));
        if (showing.length === 2) {
            let deck = JSON.parse(JSON.stringify(this.state.deck));

            if (deck[showing[0]].value === deck[showing[1]].value) {
                deck[showing[0]].solved = true;
                deck[showing[1]].solved = true;
            } else {
                deck[showing[0]].showing = false;
                deck[showing[1]].showing = false;
            }
            showing = [];
            this.setState({ deck, showing });

        }

    }

    showCard = (i) => {
        if (this.state.showing.length >= 2) { return; }
        let deck = JSON.parse(JSON.stringify(this.state.deck));
        deck[i].showing = true;

        let showing = JSON.parse(JSON.stringify(this.state.showing));
        if (showing.length < 2) {
            showing.push(i);
        }

        this.setState({ deck, showing }, () => {
            if (showing.length === 2) {
                setTimeout(() => {
                    this.checkIfMatch();
                }, 2000);
            }

        });

    }

    render() {
        let deck = '';
        if (this.state.deck.length === 52) {
            deck = Array(4).fill(0).map((e, i) => {
                return (
                    <div className="row">
                        {Array(13).fill(0).map((e2, i2) => {
                            return (
                                <div className="col">
                                    <Card
                                        i={i * 13 + i2}
                                        card={this.state.deck[i * 13 + i2]}
                                        getCard={this.getCard}
                                        showCard={this.showCard}
                                    />

                                    {/* {i} - {i2} */}
                                    {/* {i*13  + i2} - */}
                                    {/* {this.state.deck[i*13 + i2] ? this.state.deck[i*13+i2].value : ''} */}
                                    {/* {this.state.deck[i*13 + i2] ? this.state.deck[i*13+i2].suit : ''} */}
                                </div>
                            );
                        })}
                    </div>
                );
            });
        }

        return (
            <div>
                {deck}
                {/* <div>{this.state.showing}</div> */}
            </div>
        );
    }
}

export default Deck;
