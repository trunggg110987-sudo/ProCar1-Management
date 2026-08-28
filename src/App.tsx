import { useState } from 'react';
import { Auth } from './components/Auth';
import { Home } from './components/Home';

function App() {
  const [username, setUsername] = useState<string>('');

  const handleLoginSuccess = (name: string) => {
    setUsername(name);
  };

  const handleLogout = () => {
    setUsername('');
  };

  return (
    <>
      {username ? (
        <Home username={username} onLogout={handleLogout} />
      ) : (
        <Auth onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;
