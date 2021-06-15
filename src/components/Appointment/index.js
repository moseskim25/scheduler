import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function deleteInterview() {
    transition(DELETING, true);
    props.deleteInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => {
      transition(ERROR_DELETE, true)
    });
  }

  console.log(props);

  if (props.time === '5pm') {
    return (<div>
      <Header time={props.time}/>
    </div>)
  }

  return (
    <div>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
        student={props.interview && props.interview.student}
        interviewer={props.interview && props.interview.interviewer.id}
        interview={props.interview}/>}
        
      {mode === SHOW && <Show 
        student={props.interview.student} 
        interview={props.interview} 
        onDelete={confirmDelete} 
        onEdit={() => transition(CREATE)}/>}

      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={deleteInterview} message='Are you sure you would like to delete?'/>}
      {mode === ERROR_SAVE && <Error message='Encountered an error while saving. Please try again' onClose={() => {back()}}/>}
      {mode === ERROR_DELETE && <Error message='Encountered an error while deleting. Please try again' onClose={() => {back(); back();}}/>}

    </div>
  );
}
