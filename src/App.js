import './App.css';
import Groups from './groups/Groups';
import Chat from './chat/Chat';
import { useChatStore } from './chat/chatStore';

function App() {
  const { chatName } = useChatStore();
  return (
    <div className="container">
        <Groups/>
        {chatName && <Chat/>}
    </div>
  );
}

export default App;
