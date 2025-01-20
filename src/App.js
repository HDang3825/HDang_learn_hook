import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
