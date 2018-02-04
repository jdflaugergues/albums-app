import React, {Component} from 'react';
import cxs from 'cxs';

import {colors, font} from '../../common/theme';

const emptyResultStyle = cxs({
  textAlign: 'center',
  ' h2': {
    paddingTop: '50px',
    fontSize: font.titleSize,
    lineHeight: '44px',
    fontWeight: '600',
    margin: '24px 0'
  },
  ' h3': {
    color: colors.secondaryColor,
    fontWeight: 'normal',
    margin: 0
  }
});

// Component of the empty albums result
class EmptyResult extends Component {

  render() {
    return (
      <div className={emptyResultStyle}>
        <div>
          <h2>No Results</h2>
          <h3>There is no album for this artist research</h3>
          <h3>Please try to search another artist.</h3>
        </div>
      </div>
    );
  }
}

export default EmptyResult;
