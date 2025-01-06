import './App.css';
import Todoform from './Components/Todoform';
import Todotable from './Components/Todotable';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Todoform/>}/>
          <Route path="/table" exact element={<Todotable/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
