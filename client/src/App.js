import './App.css';
// import CreateQuotes from './components/CreateQuotes';
// import Login from './components/Login';
// import Profile from './components/Profile';
// import Signup from './components/Signup';
// import Home from './components/Home';
import Navbar from './components/Navbar';
import {routes} from './routes'
import { useRoutes } from 'react-router-dom';


function App() {

  const elememnt=useRoutes(routes)

  return (
    <div className="App">
      <Navbar/>
      {elememnt}
    </div>
  );
}

export default App;
