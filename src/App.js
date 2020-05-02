import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      "title": `Novo ${Date.now()}`,
      "url": "andre",
      "techs": ["NodeJS", "Javascript"]
    };

    const response = await api.post('repositories', newRepo);
    setRepo([...repo, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if (response.status === 204) {
      const repositoryIndex = repo.findIndex(repo => repo.id === id);
      repo.splice(repositoryIndex, 1);

      setRepo([...repo]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map(item => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
