import React from 'react';
import {LED_SIZE, LED_SPACE} from '../../shared/constants';

const styles = {
  rowStyle: {
    display: 'flex',
  },

  cellStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: LED_SIZE + 2 * LED_SPACE,
    width: LED_SIZE + 2 * LED_SPACE,

    color: '#fff',
  },
};

const styleForLED = color => ({
  height: LED_SIZE,
  width: LED_SIZE,
  borderRadius: LED_SIZE / 2,

  backgroundColor: color,
});

export default ({emulator}) => (
  <div>
    {emulator.frame.map((row, i) => (
      <div key={i} style={styles.rowStyle}>
        {row.map((color, j) => (
          <div key={j} style={styles.cellStyle}>
            <div style={styleForLED(color)} />
          </div>
        ))}
      </div>
    ))}
  </div>
);
