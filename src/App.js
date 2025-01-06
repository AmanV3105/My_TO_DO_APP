import './App.css';
import Todoform from './Components/Todoform';
import Todotable from './Components/Todotable';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="https://amanv3105.github.io/My_TO_DO_APP/" exact element={<Todoform/>}/>
          <Route path="https://amanv3105.github.io/My_TO_DO_APP/table" exact element={<Todotable/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
