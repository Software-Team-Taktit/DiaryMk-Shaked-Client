import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'
import Chat from './pages/Chat';
import Recordings from './pages/Recordings';
import Settings from './pages/Settings';
import Record from './pages/Record';
import NewSession from "./pages/NewSession";

const shakedImage = {
    hadPopped:false
};

const App: React.FunctionComponent = () => {

    const [hadPopped, setHadPopped] = useState<boolean>(false);

  return (
      <>
        <Router>
          <Sidebar />
          <Routes>
            <Route path='/Chat' element={<Chat />} />
            <Route path='/' element={<Recordings hadPopped={hadPopped} setHadPopped={setHadPopped} />} />
              <Route path='/NewSession' element={<NewSession/>}/>
            <Route path='/Settings' element={<Settings />} />
              <Route path='/:id/:filename' element={<Record />} />
          </Routes>
        </Router>
      </>
  )
}

export default App
