import { useState } from 'react';
import { LocaleContext } from './localeContext';
import { Calendar } from './calendar';

export function DemoCalendar() {
  const
    [locale, setLocale] = useState('ru');

  return <>
    <label>
      locale:
      <select value={locale} onChange={event => setLocale(event.target.value)}>
        {['ru', 'en', 'ar', 'zh', 'ja', 'ko'].map(l =>
          <option key={l} value={l}>{l}</option>
        )
        }
      </select>
    </label>
    <h1>Calendar demo</h1>
    <LocaleContext.Provider value={locale}>
      <DemoCalendarIndicator />
    </LocaleContext.Provider>
  </>
}

function DemoCalendarIndicator() {
  const
    [date, setDate] = useState(new Date());
  return <fieldset>
    <legend>DemoCalendarIndicator</legend>
    <input type="month" valueAsDate={date} onChange={event=>setDate(event.target.valueAsDate)}/>
    <Calendar date={date}/>

  </fieldset>
}