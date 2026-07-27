import { RouterProvider } from 'react-router-dom';
import  Routes  from './browserRoutes/routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = Routes();

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
