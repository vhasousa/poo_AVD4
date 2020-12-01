import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi';
import './styles.css'

import api from '~/services/api';

function Dashboard() {
  const [consultation, setConsultation] = useState([]);

  useEffect(() => {
    api.get(`consult`).then((response) => {
      setConsultation(response.data);
    });
  }, []);

  async function handleDeleteIncident(id){
    try {
        await api.delete(`consult/${id}`);

        setConsultation(consultation.filter(incident => incident.id !== id));
    } catch (err) {
        alert('Erro ao deletar caso, tente novamente');
    }
}

  return (
    <div className="profile-container">
    <header>
        <Link className="button" to="register">Cadastrar nova consulta</Link>
    </header>

    <h1>Consultas Cadastrados</h1>

    <ul>
      {consultation.map(consult => (
        <li key={consult.id}>
            <strong>Médico:</strong>
            <p>{consult.doctor.name}</p>
            <strong>Especialidade:</strong>
            <p>{consult.doctor.specialty}</p>
            <strong>Paciente:</strong>
            <p>{consult.patient.name}</p>
            <strong>Data da consulta:</strong>
            <p>{moment(consult.consultation_date).format("D/M/YYYY")}</p>
            <strong>Horário da consulta:</strong>
            <p>{moment(consult.consultation_date).format("HH:mm")}</p>

            <button onClick={() => handleDeleteIncident(consult.id)} type="button">
                <FiTrash2 size={20} color="#E02041" />
            </button>
        </li>
      ))}
    </ul>
</div>
);
}

export default Dashboard;
