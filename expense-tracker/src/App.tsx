import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import ShowData from './components/ShowList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowData />} />
        <Route path="/add" element={<ExpenseTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;