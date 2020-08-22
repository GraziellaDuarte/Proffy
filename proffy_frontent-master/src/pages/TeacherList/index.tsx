import React, { useState, useEffect, FormEvent } from 'react';

import PageHearder from '../../components/PagaHeader';
import CardTeacher, { Teacher } from '../../components/CardTeacher';
import Input from '../../components/Input';
import Select from '../../components/Select/index';
import api from '../../services/api';

import './style.css';

const TeacherForm: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    api.get('/classes').then(response => {
      const { data } = response;

      setTeachers(data);
    });
  }, []);

  const seacherTeachers = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.get('classes/filter', {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setTeachers(response.data);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHearder title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={seacherTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => { setSubject(e.target.value); }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Matematica', label: 'Matematica' },
              { value: 'Fisica', label: 'Fisica' },
              { value: 'Quimica', label: 'Quimica' },
              { value: 'Educação Fisica', label: 'Educação Fisica' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => { setWeek_day(e.target.value); }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda' },
              { value: '2', label: 'Terça' },
              { value: '3', label: 'Quarta' },
              { value: '4', label: 'Quinta' },
              { value: '5', label: 'Sexta' },
              { value: '6', label: 'Sabado' },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => { setTime(e.target.value); }}
          />

            <button type="submit">
              Buscar
            </button>
        </form>
      </PageHearder>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <CardTeacher key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherForm;
