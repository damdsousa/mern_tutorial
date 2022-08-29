import './App.css';
import Routes from './routes';

import {Container} from 'reactstrap'
function App() {
  return (
    <Container>  
      <h1>Sports App</h1>
      <div className='content'>
        <Routes/>
      </div>
    </Container>
  );
}

export default App;
