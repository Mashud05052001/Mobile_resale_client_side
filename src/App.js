import logo from './logo.svg';
import './App.css';
import { router } from './Routes/routes'
import { RouterProvider } from 'react-router-dom';
function App() {
  return (
    <div data-theme="light" className='min-h-screen'>
      <div className='max-w-screen-xl  mx-auto xl:p-0 px-5 '>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
