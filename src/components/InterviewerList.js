import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props) {
  const {interviewers} = props;
  const interviewersArr = interviewers.map(interviewer => (
    <InterviewerListItem
      key = {interviewer.id}
      name = {interviewer.name}
      avatar = {interviewer.avatar}
      setInterviewer = {() => props.onChange(interviewer.id)}
      selected = {interviewer.id === props.value}
    />
  ))
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArr}</ul>
    </section>
  )
}