import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Form from "./components/Form";
import Table from './components/Table';
import Navbar from './components/Navbar';
import { useState } from 'react';
import ForgotPassword from './components/ForgotPassword';


function App() {
  
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState([
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 25 },
      { id: 3, name: 'Bob', age: 40 },
    ]);

    const headers = ['ID', 'Name', 'Age'];
    const keys = ['id', 'name', 'age'];
  return (
      <BrowserRouter>
          <Navbar/>
          <div className="h-screen bg-[#FFF5F9] flex justify-center items-center">
            <Routes>
              <Route
                path='/'
                element={<Form/>}
              />
              <Route
                path='/table'
                element={ <Table data={data} headers={headers} keys={keys} /> }
              />
              <Route
                path='/forgotPassword'
                element={ <ForgotPassword/> }
              />
            </Routes>
          </div>
      </BrowserRouter>
     
  );
}

export default App
