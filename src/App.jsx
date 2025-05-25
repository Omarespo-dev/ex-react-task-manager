//vari importazioni

//routing
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//css
import './App.css'

//importo pages
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import TaskDetail from './pages/TaskDetail'
//importo componenti
import Header from './components/Header'
import Footer from './components/Footer'


//importo context dove abbiamo la chiamata
import GlobalProvider from './contexts/GlobalContext'


//IMPORTO TOAST ALERT
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <GlobalProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/addList' element={<AddTask />} />
            <Route path='/task/:id' element={<TaskDetail />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GlobalProvider>



    </>
  )
}

export default App
