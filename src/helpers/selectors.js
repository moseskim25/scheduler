//state = { days: Array, appointments: Object, interviewers: Object }

// example of one appointment: {
//   id: 3,
//   time: "2pm",
//   interview: { student: "Archie Cohen", interviewer: 2 }
// }
export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];

  //return appointment ids for a given day - ex. [1, 2, 3, 4]
  let idsOnDay = state.days.filter(x => x.name === day);
  if (idsOnDay.length === 0) return []
  else idsOnDay = idsOnDay[0].appointments;

  const appointments = idsOnDay.map(id => {
    return state.appointments[`${id}`];
  })

  return appointments;
}


//ex: interview = { student: "Archie Cohen", interviewer: 2 }
export function getInterview(state, interview) {
  if (interview === null) return null;
  
  const interviewerId = interview.interviewer;
  return {...interview, interviewer: state.interviewers[`${interviewerId}`]};
}


//{id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg"}
export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) return [];

  let idsOnDay = state.days.filter(x => x.name === day);
  if (idsOnDay.length === 0) return []
  else idsOnDay = idsOnDay[0].interviewers;

  const interviewers = idsOnDay.map(id => {
    return state.interviewers[`${id}`];
  })
  return interviewers;
}