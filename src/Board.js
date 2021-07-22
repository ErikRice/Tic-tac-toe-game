import './Board.css';
import Square from './Square.js';
import {useState} from 'react';

const Board = () => {
  const [player, setPlayer] = useState(1);
  const [turn, setTurn] = useState([]);
  
  let status = `This turn: Player ${player}`;
  let winStatus = `Winner: ${checkWin(turn)}`
  
  const playerChange = () => {
    if (player == 1){
      setPlayer(player + 1)
    } if (player == 2) {
      setPlayer(player - 1)
    };
    return player;
  }
  
  function winningCombo (set, subset) {
    
    for (let item of subset) {
      if (!set.has(item)) {
        return false;
      } 
    }
    return true;

  };
  
  function checkWin (turn) {
    const winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    console.log("checkWins=>", turn)
    if (turn == null) return 'No wins yet';
    if (turn.length < 5) return 'No wins yet';
    
    let player2arr = turn.filter((item) => {if (item.player == 2) return item;});
    player2arr = player2arr.map((item) => item.square);
    console.log('player0:', player2arr);
    
    let player1arr = turn.filter((item) => {if (item.player == 1) return item;});
    player1arr = player1arr.map((item) => item.square);
    console.log('player1:', player1arr);

    if (player2arr != null && player1arr != null) {
      var player2win = winCombos.filter((item)=> {return winningCombo(new Set(player2arr), new Set(item))});
      var player1win = winCombos.filter((item)=> {return winningCombo(new Set(player1arr), new Set(item))});
    };

    if (player2win.length > 0) {return 'Player 2 wins'};
    if (player1win.length > 0) {return 'Player 1 wins'};

    return 'No wins yet';

  };
  
  const takeTurn = (player, id) => {
    const playerTurn = {player: player, square: id};
    setTurn([...turn, playerTurn]);
    console.log(`turn state ${turn}`);
  };



  const renderSquare = function (id) {
    return <Square id={id} player={player} playerChange={playerChange} takeTurn={takeTurn}></Square>
  };
  
  
  
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1 className="game-status">{status}</h1>
        <h1 className="game-status">{winStatus}</h1>
      </div>
    </div>
  );
};

export default Board;
