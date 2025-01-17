import React from 'react';

const hobbies = ['Reading', 'Gaming', 'Coding', 'Cooking'];

const Sidebar: React.FC = () => {
  return (
    <aside style={{ width: '200px', padding: '10px', borderRight: '1px solid #ddd' }}>
      <h3>Hobbies</h3>
      {hobbies.map((hobby) => (
        <div
          key={hobby}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('hobby', hobby)}
          style={{ padding: '5px', margin: '5px 0', backgroundColor: '#eee', cursor: 'grab' }}
        >
          {hobby}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
