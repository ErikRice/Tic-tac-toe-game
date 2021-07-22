import {useState} from 'react';
import './Board.js';

const Square = ({id, player, playerChange, takeTurn}) => {               //you can also use props (without curly braces) as the argument and props.id in the header tag
    const [color, setColor] = useState('')
    const [mark, setMark] = useState('0')
    const [disabled, setDisabled] = useState(false);
    const colorPalette = ['gray', 'red', 'blue'];
    const playerMarks = [ '-', 'X', 'O'];
    
  
  
    return(
      <button disabled={disabled}
      onClick = {e => {
        setMark(playerChange());
        setColor(player);
        takeTurn(player, id);
        setDisabled(true);
        console.log({id});
      }}
      style= {{ background: colorPalette[color] }}
      >
          <h1>{playerMarks[mark]}</h1>
      </button>
    )
  }

  export default Square;