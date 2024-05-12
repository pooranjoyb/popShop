import { RouterProvider } from 'react-router-dom';
import { Routes } from './browserRoutes/routes/Routes';

function App() {

  return (
    <>
    
      <RouterProvider router={Routes} />
    
    </>
  )
}

export default App
