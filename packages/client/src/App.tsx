import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import CreateForm from './pages/CreateForm/CreateForm';
import FormFiller from './pages/FormFiller/FormFiller';
import Responses from './pages/Responses/Responses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          
          <Route index element={<HomePage />} />

          <Route path="/forms/new" element={<CreateForm />} />
          
          <Route path="forms/:id/fill" element={<FormFiller />} />
        
          <Route path="forms/:id/responses" element={<Responses />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;