import React from 'react';

const cardBackImageURL = 'https://previews.123rf.com/images/bobyramone/bobyramone1206/bobyramone120600016/14167526-playing-card-back-side-60x90-mm.jpg';

// static card component. renders as a card back or a card face, based on props 
const Card = (props) => {
    return (
        props.card.flipped ? (
            <div 
                className="card"
                style={{opacity: props.card.solved ? '0.1' : '1' }}
            >
                <img
                    src={props.card.image}
                    alt="new"
                    height="120"
                    width="80"
                />
            </div>
        ) : (
            <div 
                className="card"
                onClick={() => props.showCard(props.i)} 
            >
                <img
                    src={cardBackImageURL}
                    alt="new"
                    height="120"
                    width="80"
                />
            </div>
        )
    );
}

export default Card;