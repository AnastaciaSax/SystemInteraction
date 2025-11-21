import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import store from './store';
import Header from './components/common/Header';
import Footer from './components/common/Footer'; // Добавляем Footer
import Dashboard from './pages/Dashboard';
import CountriesPage from './pages/CountriesPage';
import RoutesPage from './pages/RoutesPage';
import SalesPage from './pages/SalesPage';
import StatisticsPage from './pages/StatisticsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Header />
          <Container fluid className="mt-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/countries" element={<CountriesPage />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
          </Container>
          <Footer /> 
        </div>
      </Router>
    </Provider>
  );
}

export default App;
