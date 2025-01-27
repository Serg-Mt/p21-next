import { useContext, useMemo } from 'react'
import { LocaleContext } from './localeContext'
import cssClasses from './calendar.module.css'

/**
 * 
 * @param {object} props
 * @param {Date} props.date 
 */
export function Calendar({ date, selectDate = null }) {
  const
    locale = useContext(LocaleContext),
    caption = date.toLocaleDateString(locale, { month: 'long', year: 'numeric' }),
    dayNames = useMemo(() => Array.from({ length: 7 }, (_, i) => <td key={i}>
      {(new Date(2019, 0, i).toLocaleDateString(locale, { weekday: 'short' }))}
    </td>), [locale]),
    year = date.getFullYear(),
    month = date.getMonth(), // 0==jan
    max = (new Date(year, month + 1, 0)).getDate(),
    firstWeekDay = (new Date(year, month, 1)).getDay(), // 0 = ВС 1 = ПН 2 = Вт
    shift = (-1 + firstWeekDay + 7) % 7,              //        0 = ПН 1 = Вт .. 6 = Вс  
    selected = selectDate && date.getDate(),
    onClick = selectDate ? event => {
      const
        day = +event.target.closest('td')?.textContent;
      console.log('onClick', day)
      if (day && selectDate) selectDate(new Date(year, month, day))
    } : null;
  return <table className={cssClasses.calendar}>
    <caption>{caption}</caption>
    <thead>
      <tr>{dayNames}</tr>
    </thead>
    <tbody onClick={onClick}>
      <Month shift={shift} max={max} selected={selected} />
    </tbody>
  </table>
}

function Month({ shift, max, selected }) {
  const result = [];
  for (let start = 1 - shift; start <= +max; start += 7)
    result.push(<Week key={start} start={start} max={max} selected={selected}/>)
  return <>{result}</>
}

function Week({ start, max, selected }) {
  return <tr>
    {Array.from({ length: 7 }, (_, i) => {
      const day = start + i;
      return <td className={selected === day ? cssClasses.selected : ''}>
        {day >= 1 && day <= max && day}
      </td>
    })}
  </tr>
}