import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageForm from './pages/Admin';
import About from './pages/About';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Packages2 from './pages/packages2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<PackageForm />} />
        <Route path="/packages" element={<Packages/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/packages2" element={<Packages2/>}/>

      </Routes>
    </Router>
  );
}

export default App;