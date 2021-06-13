import react, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //ex. inserts {student: "name", interviewer: 8} into /api/appointments
  function bookInterview(id, interview) {
    console.log('1. interview:', interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log('2. interview:', interview);
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({...state, appointments});
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
      setState({...state, appointments});
    })
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day }));


  useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments"), axios.get("/api/interviewers")]).then((all) => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // const updateSpots() {

  // }


  return { state, setDay, bookInterview, deleteInterview};
}