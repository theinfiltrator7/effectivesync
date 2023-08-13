import './App.css'

import Home from './Containers/Home/Home';
import Members from './Containers/Members/Members';
import Tasks from './Containers/Tasks/Tasks'

function App() {
  return (
    <div>
      <div className='app'>
        <Tasks/>
        {/* <Members/> */}
        {/* <Home/> */}

      </div>
    </div>

  );
}

export default App;
