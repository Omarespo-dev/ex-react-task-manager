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



function App() {


  return (
    <>
      

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/addList' element={<AddTask />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      
    </>
  )
}

export default App
