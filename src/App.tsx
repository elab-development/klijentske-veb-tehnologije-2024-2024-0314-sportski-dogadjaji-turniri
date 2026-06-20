import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigacija } from './komponente/navigacija';
import { Pocetna } from './strane/pocetna';
import { Turniri } from './strane/turniri';
import { KreirajTurnir } from './strane/kreirajTurnir';
import { Profil } from './strane/profil';
import { Prijava } from './strane/prijava';
import { Registracija } from './strane/registracija';

function App() {
  return (
    <Router>
      <Navigacija />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/pocetna" />} />
          <Route path="/pocetna" element={<Pocetna />} />
          <Route path="/turniri" element={<Turniri />} />
          <Route path="/kreiraj-turnir" element={<KreirajTurnir />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/prijava" element={<Prijava />} />
          <Route path="/registracija" element={<Registracija />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;