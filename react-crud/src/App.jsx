
import './App.css'

import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Update from './Update';
import Create from './Create';
import Home from './Home';
import Read from './Read';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/create' element={<Create />}></Route>
      <Route path='/update/:id' element={<Update />}></Route>
      <Route path='/read/:id' element={<Read />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
