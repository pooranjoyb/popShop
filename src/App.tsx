import { RouterProvider } from 'react-router-dom';
import  Routes  from './browserRoutes/routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <RouterProvider router={Routes()} />
      <ToastContainer />
    </>
  )
}

export default App
