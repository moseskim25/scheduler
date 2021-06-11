import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  // const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);


  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"), 
      axios.get("/api/appointments"),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
    
  }, []);
  
  const appointmentsArr = appointments.map((appointment) => <Appointment key={appointment.id} {...appointment} interviewers={getInterviewersForDay(state, state.day)}/>);
  appointmentsArr.push(<Appointment key="last" time="5pm" />);



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
      <section className="schedule">{appointmentsArr}</section>
    </main>
  );
}
