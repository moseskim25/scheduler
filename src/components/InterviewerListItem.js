import React from 'react';
import 'components/InterviewerListItem.scss';
const classnames = require('classnames');

export default function InterviewerListItem({name, avatar, setInterviewer, selected}) {
  
  const interviewerClass = classnames('interviewers__item', {
    'interviewers__item--selected': selected
  })

  return (
    <li 
      className={interviewerClass}
      onClick={setInterviewer}
    >
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
