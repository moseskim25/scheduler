// import axios from "axios";

export function getAppointmentsForDay(state, day) {
  // console.log('state:', state);
  if (state.days.length === 0) return [];

  let idsOnDay = state.days.filter(x => x.name === day);
  if (idsOnDay.length === 0) return []
  else idsOnDay = idsOnDay[0].appointments;

  const appointments = idsOnDay.map(id => {
    return state.appointments[`${id}`];
  })

  return appointments;
}

export function getInterview(state, interview) {
  if (interview === null) return null;
  
  const result = interview;
  const interviewerId = interview.interviewer;
  
  result.interviewer = state.interviewers[`${interviewerId}`];
  return result;
}