import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import {TbilisiBatumi} from './games/tbilisi-batumi-1/TbilisiBatumi';
import { Bagrationi } from './games/common/bagrationi/Bagrationi';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <Routes>
        <Route path='/' element={ <App /> }  />
        <Route path='/games/batumisken' element={ <TbilisiBatumi /> }  />
        <Route path='/games/bagrationi' element={ <Bagrationi /> }  />
    </Routes>
  </Router>
);

