import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log('error within index.js - save function:', err));
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function deleteInterview() {
    transition(DELETING);
    props.deleteInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => console.log('error within index.js - deleteInterview function:', err));
  }

  return (
    <div>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}/>}
      {mode === SHOW && <Show student={props.interview.student} interview={props.interview} onDelete={confirmDelete}/>}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={deleteInterview} message='Are you sure you would like to delete?'/>}
    </div>
  );
}
