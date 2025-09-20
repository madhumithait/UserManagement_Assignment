import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import ViewUser from './pages/ViewUser';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/view/:id" element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;