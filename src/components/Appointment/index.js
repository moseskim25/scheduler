import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
  }

  return (
    <div>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}/>}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
    </div>
  );
}
