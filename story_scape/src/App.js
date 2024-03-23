import './App.css';
import Routes from './components/Routes';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import CustomDataContext from './context/dataContext';


function App() {
  return (
    <div className="App">
       <CustomDataContext>
    <PrimeReactProvider>
      <Routes/>
      </PrimeReactProvider>  
      </CustomDataContext>
    </div>
  );
}

export default App;
