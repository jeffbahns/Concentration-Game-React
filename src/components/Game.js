import React from 'react';

import Deck from './Deck';

class Game extends React.Component {
  render() {
    return (
      <div>
        <div className="col-12">Concentration</div>
        <Deck />
      </div>
    );
  }
}

export default Game;
