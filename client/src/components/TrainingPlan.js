import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrainingPlan.css'

function TrainingPlan({weeks}) {
  const [brojNedelja, setBrojNedelja] = useState(0); // Inicijalno postavite broj nedelja na 12
  const [treningPlan, setTreningPlan] = useState([]); // Niz za čuvanje trening plana
  // Funkcija za dinamičko generisanje polja na osnovu broja nedelja
  useEffect(()=>{
    setBrojNedelja(weeks)
  },[weeks])
  const generisiPolja = () => {
    const polja = [];
    for (let i = 1; i <= brojNedelja; i++) {
      polja.push(
        <div key={i}>
          <h3>Nedelja {i}</h3>
          <label>Ponedeljak:</label>
          <input
            type="text"
            value={treningPlan[i - 1]?.ponedeljak || ''}
            onChange={(e) => updateTreningPlan(e, i, 'ponedeljak')}
          />
          <label>Utorak:</label>
          <input
            type="text"
            value={treningPlan[i - 1]?.utorak || ''}
            onChange={(e) => updateTreningPlan(e, i, 'utorak')}
          />
          <label>Sreda:</label>
          <input
            type="text"
            value={treningPlan[i - 1]?.sreda || ''}
            onChange={(e) => updateTreningPlan(e, i, 'sreda')}
          />
          <label>Cetvrtak:</label>
          <input
            type="text"
            value={treningPlan[i - 1]?.cetvrtak || ''}
            onChange={(e) => updateTreningPlan(e, i, 'cetvrtak')}
          />
          <label>Petak:</label>
          <input
            type="text"
            value={treningPlan[i - 1]?.petak || ''}
            onChange={(e) => updateTreningPlan(e, i, 'petak')}
          />
          <label>Subota:</label>
          <input
            type="text"
            value={treningPlan[i - 1]?.subota || ''}
            onChange={(e) => updateTreningPlan(e, i, 'subota')}
          />
          <label>Nedelja:</label>
          <input
            type="text"
            value={treningPlan[i - 1]?.nedelja || ''}
            onChange={(e) => updateTreningPlan(e, i, 'nedelja')}
          />
        </div>
      );
    }
    return polja;
  };

  // Funkcija za ažuriranje trening plana
  const updateTreningPlan = (e, nedelja, dan) => {
    const updatedPlan = [...treningPlan];
    if (!updatedPlan[nedelja - 1]) {
      updatedPlan[nedelja - 1] = {};
    }
    updatedPlan[nedelja - 1][dan] = e.target.value;
    setTreningPlan(updatedPlan);
  };

  // Funkcija za slanje podataka na server
  const posaljiTreningPlan = async () => {
    try {
      const response = await axios.post('URL_DO_APIJA', { treningPlan });
      console.log('Podaci su uspešno poslati na server:', response.data);
    } catch (error) {
      console.error('Greška prilikom slanja podataka:', error);
    }
  };

  return (
    <div className=''>
      <h1>Generisanje Trening Plana</h1>
      <label>Broj Nedelja:</label>
      {/* <select value={brojNedelja} onChange={(e) => setBrojNedelja(e.target.value)}>
        <option value={12}>12</option>
        <option value={16}>16</option>
      </select> */}
      {generisiPolja()}
      <button onClick={posaljiTreningPlan}>Pošalji na Server</button>
    </div>
  );
}

export default TrainingPlan;
