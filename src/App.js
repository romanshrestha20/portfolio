import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App dark:bg-gray-800">
        <Navbar />

      <div className="min-h-screen dark:bg-gray-800 bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold dark:text-blue-400 text-blue-600">Welcome to My Portfolio!</h1>
    </div>
    </div>
  );
}

export default App;
