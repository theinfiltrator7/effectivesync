import './App.css'
import CardHolder from './Components/CardHolder/CardHolder';
import Navbar from './Components/Navbar/Navbar';
import Home from './Containers/Home/Home';

function App() {
  return (
    <div>
      <Navbar/>

      <div className='app'>

 
        <Home/>
      </div>
    </div>

  );
}

export default App;
