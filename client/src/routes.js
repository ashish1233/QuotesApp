import './App.css';
import CreateQuotes from './components/CreateQuotes';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Home from './components/Home';
import OtherUserProfile from './components/OtherUserProfile';
import NotFound from './components/NotFound';


export const routes = [
    { path : '/' , element : <Home/> },
    { path : '/create' , element : <CreateQuotes/> },
    { path : '/login' , element : <Login/> },
    { path : '/signup' , element : <Signup/> },
    { path : '/profile' , element : <Profile/> },
    { path : '/profile/:userid' , element : <OtherUserProfile/> },
    { path : '*' , element : <NotFound/> }

]