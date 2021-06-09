import axios from "axios";

export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];

  let idsOnDay = state.days.filter(x => x.name === day);
  if (idsOnDay.length === 0) return []
  else idsOnDay = idsOnDay[0].appointments;

  const appointments = idsOnDay.map(id => {
    return state.appointments[`${id}`];
  })

  return appointments;
}