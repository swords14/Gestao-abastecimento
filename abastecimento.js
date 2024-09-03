import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [funcionario, setFuncionario] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [data, setData] = useState('');
  const [abastecimentos, setAbastecimentos] = useState([]);
  const [message, setMessage] = useState('');

  const apiUrl = 'http://127.0.0.1:5000'; // URL da sua API Flask

  const registrarAbastecimento = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/abastecimento`, {
        funcionario,
        quantidade: parseFloat(quantidade),
        data,
      });
      setMessage(response.data.message);
      listarAbastecimentos();
    } catch (error) {
      setMessage('Erro ao registrar abastecimento.');
    }
  };

  const listarAbastecimentos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/abastecimentos`);
      setAbastecimentos(response.data);
    } catch (error) {
      console.error('Erro ao listar abastecimentos:', error);
    }
  };

  useEffect(() => {
    listarAbastecimentos();
  }, []);

  return (
    <div className="container">
      <h1>Gestão de Abastecimento de Combustíveis</h1>
      <form onSubmit={registrarAbastecimento}>
        <input
          type="text"
          placeholder="Funcionário"
          value={funcionario}
          onChange={(e) => setFuncionario(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade (litros)"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <button type="submit">Registrar Abastecimento</button>
      </form>
      {message && <div id="message">{message}</div>}
      <h2>Abastecimentos Registrados</h2>
      <ul>
        {abastecimentos.map((a) => (
          <li key={a.id}>
            {a.data}: {a.funcionario} abasteceu {a.quantidade} litros
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;