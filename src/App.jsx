//vari importazioni

//routing
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//css
import './App.css'

//importo pages
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"

//importo componenti
import Header from './components/Header'
import Footer from './components/Footer'


//importo context dove abbiamo la chiamata
import GlobalProvider from './contexts/GlobalContext'



function App() {


  return (
    <>

      <GlobalProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/addList' element={<AddTask />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GlobalProvider>



    </>
  )
}

export default App
