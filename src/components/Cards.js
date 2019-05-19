import React, { Component } from 'react';


const Card = props => {
    return (
        <div className="row" style={{width: '50px', height: '50px'}}>Card #{props.value+1}</div>
    );
}
class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '',
            stored: 0,
            stack: ''
        };
    }
    render() {
        let cards = Array(52).fill(1).map((j,i) => {
            return <Card key={i} value={i} />
        });
        return (
            <div>
                <div>{this.state.display}</div>
                <div>{cards}</div>
            </div>
        );
    }
}

export default Cards;