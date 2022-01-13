import React, { useEffect, useReducer, useState } from 'react'

type SubjectName = 'Natureza' | 'Linguagens' | 'Humanas' | 'Matemática' | 'Todas'
type SchoolLevel = 'Fundamental 1' | 'Fundamental 2' | 'Ensino Médio'

const Table = () => {
  const [price, setPrice] = useState(0)

  //Days
  const [daysPrice, setDaysPrice] = useState(0)
  const [days, setDays] = useState(1)
  const changeDays = (value: number) => {
    if(days + value < 1 || days + value > 5) return
    setDays(prev => prev + value)
  }
  useEffect(() => {
    switch(days){
      case 1: setDaysPrice(30)
        break
      case 2: setDaysPrice(50)
        break
      case 3: setDaysPrice(70)
        break
      case 4: setDaysPrice(90)
        break
      case 5: setDaysPrice(100)
        break
    }
  }, [days, daysPrice])

  //Ticket Passage
  const ticketPricePerMonth = 4.4 * 2 * 4 / 2
  const [ticketPrice, setTicketPrice] = useState(ticketPricePerMonth)
  const [haveTicket, setHaveTicket] = useState(true)
  useEffect(() => {
    setTicketPrice(Math.floor((ticketPricePerMonth * days) * 100) / 100)
  }, [days, ticketPrice, ticketPricePerMonth])

  //Subject
  const [subjectPrice, setSubjectPrice] = useState(0)
  const [subject, setSubject] = useState<SubjectName>('Todas')
  const changeSubject = (subjectName: SubjectName) => setSubject(subjectName)
  useEffect(() => {
    switch(subject){
      case 'Todas': setSubjectPrice(200)
      break
      case 'Natureza': setSubjectPrice(150)
      break
      case 'Linguagens': setSubjectPrice(70)
      break
      case 'Humanas': setSubjectPrice(70)
      break
      case 'Matemática': setSubjectPrice(100)
      break
    }
  }, [subjectPrice, subject])
  
  //School Level
  const [schoolLevelPrice, setSchoolLevelPrice] = useState(0)
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>('Fundamental 1')
  const changeSchoolLevel = (newSchoolLevel: SchoolLevel) => setSchoolLevel(newSchoolLevel)
  useEffect(() => {
    switch(schoolLevel){
      case 'Fundamental 1': setSchoolLevelPrice(50)
        break
      case 'Fundamental 2': setSchoolLevelPrice(70)
        break
      case 'Ensino Médio': setSchoolLevelPrice(100)
        break
    }
  }, [schoolLevel])

  //Activities
  type State = { schoolExercices: boolean, classes: boolean, activities: boolean }
  type Action = 'schoolExercices' | 'classes' | 'activities'
  const reducer: React.Reducer<State, Action> = (
    prevState: State,
    action: Action
  ): State => {
    const state = prevState
    switch(action){
      case 'schoolExercices':
        return { ...state, schoolExercices: !state.schoolExercices }
      case 'classes':
        return { ...state, classes: !state.classes }
      case 'activities':
        return { ...state, activities: !state.activities }
    }
  }
  const [activities, dispatchActivities] = useReducer(reducer, { schoolExercices: false, classes: false, activities: false })
  const [activitiesPrice, setActivitiesPrice] = useState(0)
  useEffect(() => {
    let price = 0
    for (const [, value] of Object.entries(activities)) {
      if (value) price += 50
    }
    setActivitiesPrice(price)
  }, [activities])

  //Overall Price
  useEffect(() => {
    setPrice(daysPrice + (haveTicket ? ticketPrice : 0) + subjectPrice + schoolLevelPrice + activitiesPrice)
  }, [daysPrice, ticketPrice, subjectPrice, schoolLevelPrice, haveTicket, activitiesPrice])

  return (
    <main>
      <article>
        <section>
          <h1>Dias por semana</h1>
          <p>Dias: {days}</p>
          <p>Preço: {daysPrice}</p>
          <button onClick={() => changeDays(-1)}>-</button>
          <button onClick={() => changeDays(1)}>+</button>
        </section>
        <hr/>
        <section>
          <h1>Preço do transporte por mês</h1>
          <p style={{color: `${haveTicket ? 'initial' : 'red'}`}}>Preço: {ticketPrice}</p>
          <p>
            <span>Tem transporte: </span>
            <input type='checkbox' checked={haveTicket} onChange={() => setHaveTicket(!haveTicket)}/>
          </p>
        </section>
        <hr/>
        <section>
          <h1>Matérias a ensinar</h1>
          <p>Matéria(s): {subject}</p>
          <p>Preço da(s) Matéria(s): {subjectPrice}</p>
          <button onClick={() => changeSubject('Todas')}>Todas</button>
          <button onClick={() => changeSubject('Natureza')}>Natureza (Somente Ensino Médio)</button>
          <button onClick={() => changeSubject('Linguagens')}>Linguagens</button>
          <button onClick={() => changeSubject('Humanas')}>Humanas</button>
          <button onClick={() => changeSubject('Matemática')}>Matemática</button>
        </section>
        <hr/>
        <section>
          <h1>Nível escolar</h1>
          <p>Nível: {schoolLevel}</p>
          <p>Preço: {schoolLevelPrice}</p>
          <button onClick={() => changeSchoolLevel('Fundamental 1')}>Fundamental 1</button>
          <button onClick={() => changeSchoolLevel('Fundamental 2')}>Fundamental 2</button>
          <button onClick={() => changeSchoolLevel('Ensino Médio')}>Ensino Médio</button>
        </section>
        <hr/>
        <section>
          <h1>Atividades</h1>
          <p>
            <span style={{color: `${activities.schoolExercices ? 'initial' : 'red'}`}}>Atividades de colégio</span>
            <input type='checkbox' defaultChecked={activities.schoolExercices} onChange={() => dispatchActivities('schoolExercices')}/>
          </p>
          <p>
            <span style={{color: `${activities.classes ? 'initial' : 'red'}`}}>Aulas</span>
            <input type='checkbox' defaultChecked={activities.classes} onChange={() => dispatchActivities('classes')}/>
          </p>
          <p>
            <span style={{color: `${activities.activities ? 'initial' : 'red'}`}}>Novas atividades</span>
            <input type='checkbox' defaultChecked={activities.activities} onChange={() => dispatchActivities('activities')}/>
          </p>
          <p>
            Preço das atividades: {activitiesPrice}
          </p>
        </section>
      </article>
      <hr/>
      <article>
        <h1>Preço total:</h1>
        <p>{price}</p>
      </article>
    </main>
  )
}

export default Table
