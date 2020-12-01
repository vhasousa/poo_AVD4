import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import api from '~/services/api';

import { Container, Content } from './styles';

function Register_content() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [specialty, setSpecialty] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const { register, handleSubmit } = useForm({});

  useEffect(() => {
    api.get('doctors').then((response) => {
      setDoctors(response.data);
    });
    api.get('patients').then((response) => {
      setPatients(response.data);
    });
  }, []);

   const handleSelected = useCallback(async (e) => {
    setSelectedValue(e.target.value);
    console.log(selectedValue)
  }, [selectedValue]);

  useEffect(() => {
     api.get(`doctors/${selectedValue}`).then((response) => {
      const specialtySelected = response.data.specialty;
      setSpecialty(specialtySelected)
     })
  }, [selectedValue])

  const onSubmit = async (data, e) => {
    const { consultation_date, doctor_id, patient_id } = data;

    console.log(patient_id)

    await api.post('consult', {
      consultation_date,
      doctor_id,
      patient_id,
    });
    e.target.reset();
  };

  return (
    <Container>
      <Content>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="datetime-local" name="consultation_date" placeholder="Título do conteúdo" ref={register} />

        <select name="doctor_id" onChange={handleSelected} ref={register}>
          <option value="" disabled selected>
            Informe o médico
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {`Dr. ${doctor.name}`}
            </option>
          ))}
        </select>

        <input type="textarea" placeholder={specialty} />

        <select name="patient_id" ref={register}>
          <option value="" disabled selected>
            Informe o paciente
          </option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {`${patient.name}`}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar</button>
      </form>
      </Content>
    </Container>
  );
}

export default Register_content;
