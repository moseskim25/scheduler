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
      // const days = [...state.days];
      // const today = state.days.find(day => day.appointments.includes(id));
      // today.spots--;
      setState((prev) => {
        const newState = { ...prev, appointments }
        const newNewState = updateSpots(newState)

        return newNewState
      });
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
      // const days = [...state.days];
      // const today = state.days.find(day => day.appointments.includes(id));
      // today.spots++;
      setState((prev) => {
        const newState = { ...prev, appointments }
        const newNewState = updateSpots(newState)

        return newNewState
      });
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

  const findDay = (days, dayToUpdate) => {
    return days.reduce((acc, day, index) => {
      if (day.name === dayToUpdate) {
        acc.push(day.appointments)
        acc.push(day)
        acc.push(index)
      }
      return acc;
    }, [])
  }
  const updateSpots = (state, day) => {
    const dayToUpdate = day || state.day
    console.log('daytoupdate:', dayToUpdate);
    // const dayObj = state.days.find(day => day.name === dayToUpdate)
    // const dayObjIndex = state.days.findIndex(day => day.name === dayToUpdate)
    const [listOfApptIds, dayObj, dayObjIndex] = findDay(state.days, dayToUpdate)
    console.log('array:', listOfApptIds, dayObj, dayObjIndex);
    // const spots = listOfApptIds.filter(apptId => !state.appointments[apptId].interview).length
    const spots = listOfApptIds.reduce((spots, apptId) => spots += state.appointments[apptId].interview ? 1 : 0, 0)
  
    const newDay = { ...dayObj, spots }
    const newDays = [...state.days]
    newDays[dayObjIndex] = newDay
  
    return { ...state, days: newDays }
  }

  return { state, setDay, bookInterview, deleteInterview};
}