import './App.css';
import Groups from './groups/Groups';
import Chat from './chat/Chat';
import { useChatStore } from './chat/chatStore';
import GroupCalendarHeatmap from './heatmap/GroupCalendarHeatmap';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const { chatName } = useChatStore();
  const CLIENT_ID = '357613363605-s18klentru09gkgdjcqeo8q1k57r1hi1.apps.googleusercontent.com';

  return (
    <div className="container">
        <Groups/>
        {chatName && <Chat/>}
        <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GroupCalendarHeatmap/>
        </GoogleOAuthProvider>
    </div>
  );
}

export default App;
