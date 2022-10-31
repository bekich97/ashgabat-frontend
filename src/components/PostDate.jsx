import React from 'react';
import { useSelector } from "react-redux";
import { langs } from '../langs/langs';

export default function PostDate({ date }) {
  const lang = useSelector(state => state.mainSlice.lang);
    const my_date = new Date(date);
  const today = new Date();
  let g_date = "";
  let isToday = false;
  const months = [langs["Jan"][lang], langs["Feb"][lang], langs["Mar"][lang], langs["Apr"][lang], langs["May"][lang], langs["Jun"][lang], langs["Jul"][lang], langs["Aug"][lang], langs["Sep"][lang], langs["Oct"][lang], langs["Nov"][lang], langs["Dec"][lang]];
  if((my_date.getDate() === today.getDate()) && (my_date.getMonth() === today.getMonth()) && (my_date.getFullYear() === today.getFullYear())){
    g_date += langs["Today"][lang]+" "+(my_date.getHours() < 10 ? "0"+my_date.getHours() : my_date.getHours())+":"+(my_date.getMinutes() < 10 ? "0"+my_date.getMinutes() : my_date.getMinutes());
    isToday = true;
  } else {
    g_date += my_date.getDate()+" "+months[my_date.getMonth()]+" "+my_date.getFullYear();
  }
  return (
    <span className={"date-span " + (isToday ? 'today' : '')}>{g_date}</span>
  )
}
