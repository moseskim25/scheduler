import React from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from 'hooks/useApplicationData';


export default function Application() {
  
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  
  //functions from helpers file
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


  //Generates array of appointments for a given day
  const appointmentsArr = appointments.map(
    (appointment) => <Appointment 
      key={appointment.id}
      {...appointment}
      interview={getInterview(state, appointment.interview)}
      interviewers={interviewers}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}/>
  );

  console.log('+++++++++');

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointmentsArr}
        <Appointment key="last" time={"5pm"} />
      </section>
    </main>
  );
}
