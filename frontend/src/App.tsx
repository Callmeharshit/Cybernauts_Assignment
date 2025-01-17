import React from 'react';
import UserFlow from './components/UserFlow';
import Sidebar from './components/sidebar';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <UserFlow />
    </div>
  );
};

export default App;
