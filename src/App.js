import React from 'react';
import './App.css';
import Create from './components/create/create';
import Read from './components/read/read';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Update from './components/update/update';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';


function App() {
  let navigate = useNavigate();

  return (<>
    <div>
      <h1>REACT CRUD OPERATIONS</h1>
      <div className='flex-container'>
        <div className='flex1'>
          <Button color="facebook" onClick={() => navigate('/create')}>Create</Button>
        </div>
        <div className='flex2'>
          <Button color="facebook" onClick={() => navigate('/read')}>Read</Button>
        </div>
      </div>
    </div>


    <div className='main'>

      <Routes>
        <Route path='/create' exact element={<Create />} />
        <Route path='/read' exact element={<Read />} />
        <Route path='/update' exact element={<Update />} />
      </Routes>
    </div>

  </>);
}

export default App;
