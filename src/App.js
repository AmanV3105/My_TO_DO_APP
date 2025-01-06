import './App.css';
import Todoform from './Components/Todoform';
import Todotable from './Components/Todotable';
import { HashRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<Todoform />} />
          <Route path="/table" exact element={<Todotable />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
