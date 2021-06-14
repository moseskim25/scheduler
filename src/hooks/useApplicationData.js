import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay } from 'helpers/selectors';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {},
    interviewers: {},
  });

  //ex. inserts {student: "name", interviewer: 8} into /api/appointments
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      const days = [...state.days];
      const today = state.days.find(day => day.appointments.includes(id));
      today.spots--;
      setState({...state, appointments, days});
    })
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const days = [...state.days];
      const today = state.days.find(day => day.appointments.includes(id));
      today.spots++;
      setState({...state, appointments, days});
    })
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day }));


  useEffect(() => {
    Promise.all([axios.get("/api/days"), 
    axios.get("/api/appointments"), 
    axios.get("/api/interviewers")])
    .then((all) => {
      setState((prev) => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview};
}