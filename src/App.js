import {Routes,Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
   <div>
    <Layout/>
    <Routes>
      <Route path='/' exact element={<HomePage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
      <Route path='/profile' element={<UserProfile/>}/>
      <Route path='*' element={<HomePage />} /> {/* Default route */}
    </Routes>
   </div>
  );
}

export default App;
