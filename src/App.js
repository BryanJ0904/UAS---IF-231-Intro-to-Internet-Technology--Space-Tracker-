import Home from './components/Home'
import Planets from './components/Planets'
import News from './components/News'
import Forum from './components/Forum'
import './App.css'

function App() {
  let component = <Home />;
  switch (window.location.pathname){
    case "/":
      component = <Home />;
      break;
    case "/planets":
      component = <Planets />;
      break;
    case "/news":
      component = <News />;
      break;
    case "/forum":
      component = <Forum />;
      break;
  }
  return (
    <div className="app">
        {component};
    </div>
  )
}

export default App;
