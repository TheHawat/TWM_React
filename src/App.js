import logo from './logo.svg';
import './App.css';
import FC from './FirstComponent.js';
import PLO from './GameOfLife.js';

const whaaaat = <PLO height={10} width ={10}/>;


function App() {
  return (
    <div className="App">
     
        <p>
          {whaaaat}
        </p>
      
    </div>
  );
}

export default App;
