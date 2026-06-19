import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigacija } from './komponente/navigacija';
import { Pocetna } from './strane/pocetna';
import { Turniri } from './strane/turniri';
import { KreirajTurnir } from './strane/kreirajTurnir';
import { Profil } from './strane/profil';

function App() {
  return (
    <Router>
      <Navigacija /> 
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/pocetna" />} />
          <Route path="/pocetna" element={<Pocetna />} />
          <Route path="/turniri" element={<Turniri />} />
          <Route path="/kreiraj-turnir" element={<KreirajTurnir />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;