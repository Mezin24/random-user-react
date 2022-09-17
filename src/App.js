import React, { useState, useEffect, useCallback } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';
import transformData from './transformData';

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

function App() {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const newPerson = transformData(data.results[0]);
      setPerson(newPerson);
      setTitle('name');
      setValue(newPerson.name);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleEvent = (e) => {
    const { target } = e;
    if (!target.classList.contains('icon')) {
      return;
    }

    const newValue = target.getAttribute('data-value');
    setTitle(newValue);
    setValue(person[newValue]);
  };

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>my {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button
              data-value='name'
              className='icon'
              onMouseOver={handleEvent}
            >
              <FaUser />
            </button>
            <button
              data-value='email'
              className='icon'
              onMouseOver={handleEvent}
            >
              <FaEnvelopeOpen />
            </button>
            <button data-value='age' className='icon' onMouseOver={handleEvent}>
              <FaCalendarTimes />
            </button>
            <button
              data-value='street'
              className='icon'
              onMouseOver={handleEvent}
            >
              <FaMap />
            </button>
            <button
              data-value='phone'
              className='icon'
              onMouseOver={handleEvent}
            >
              <FaPhone />
            </button>
            <button
              data-value='password'
              className='icon'
              onMouseOver={handleEvent}
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' onClick={fetchUser}>
            {loading ? 'Loading...' : 'random person'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
