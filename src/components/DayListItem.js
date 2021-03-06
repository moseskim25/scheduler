import React from 'react';
import 'components/DayListItems.scss';

const classnames = require('classnames');

export default function DayListItem(props) {
  
  const dayClass = classnames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });
  
  const formatSpots = function(x) {
    if (x === 0) return 'no spots remaining';
    else if (x === 1) return '1 spot remaining';
    else return `${x} spots remaining`;
  }

  return (
    <li 
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid='day'
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}