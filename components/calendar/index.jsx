import { use, useCallback, useState } from 'react';
import { LocaleContext } from './localeContext';
import { Calendar } from './calendar';
import cssCalendar from './calendar.module.css';

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
    Задача: реализовать функционал подобно<input type="date" />
    <LocaleContext.Provider value={locale}>
      <main style={{ display: 'flex', flexWrap: 'wrap' }}>
        <DemoCalendarAsIndicator />
        <DemoCalendarAsSource />
        <DemoPopup />
        <DemoInputDate />
      </main>
    </LocaleContext.Provider>

  </>
}

function DemoCalendarAsIndicator() {
  const
    [date, setDate] = useState(new Date());
  return <fieldset>
    <legend>DemoCalendarIndicator</legend>
    <input type="month" value={DateToYYYYMM(date)} onChange={event => setDate(event.target.valueAsDate)} />
    <Calendar date={date} />
  </fieldset>
}
function DemoCalendarAsSource() {
  const
    locale = use(LocaleContext), // React 19
    [date, setDate] = useState(new Date());
  return <fieldset>
    <legend>DemoCalendarAsSource</legend>
    <Calendar date={date} selectDate={setDate} />
    <hr />
    result=<output>{date.toLocaleDateString(locale)}</output>
  </fieldset>
}
function DemoPopup() {
  const [visible, setVisible] = useState(false);
  return <fieldset>
    <legend>DemoPopup</legend>
    <button onClick={() => setVisible(true)}>open</button>
    {visible && <PopUpWindow>
      <button className={cssCalendar.close} onClick={() => setVisible(false)}>❌</button>
      <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-4 mb-3 text-link dark:text-link-dark w-24 lg:w-28 self-center text-sm mr-0 flex origin-center transition-all ease-in-out"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
    </PopUpWindow>}
  </fieldset>
}

function PopUpWindow({ children }) {
  return <div className={cssCalendar.popup}>
    {children}
  </div>
}

function DemoInputDate() {
  const
    locale = use(LocaleContext), // React 19
    [date, setDate] = useState(new Date());
  return <fieldset>
    <legend>DemoInputDate</legend>
    <InputDate date={date} selectDate={setDate} />
    <hr />
    result=<output>{date.toLocaleDateString(locale)}</output>
  </fieldset>
}


/**
 * 
 * @param {object} props
 * @param {Date} props.date 
 */
function InputDate({ date, selectDate }) {
  const
    day = date.getDate(),
    [visible, setVisible] = useState(false),
    selectDateCallback = d => { setVisible(false); selectDate(d) },
    locale = use(LocaleContext); // React 19
  return <>
    <div
      className={cssCalendar.dateselector}
      onClick={() => setVisible(true)}
    >
      {date.toLocaleDateString(locale)}
    </div>
    {visible && <PopUpWindow>
      <button className={cssCalendar.close} onClick={() => setVisible(false)}>❌</button>
      <input
        lang={locale}
        type="month"
        value={DateToYYYYMM(date)}
        onInput={event => {
          const d = event.target.valueAsDate;
          d.setDate(day);
          selectDate(d);
        }}
      />
      <Calendar date={date} selectDate={selectDateCallback} />
    </PopUpWindow>}
  </>
}

function DateToYYYYMM(date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
}