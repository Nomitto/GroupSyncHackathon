// import React from 'react';
// import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import Home from './Home';
// import SignIn from './SignIn';
// import Calendar from './Calendar';  
// import './App.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import axios from 'axios';

// function App() {
//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/calendar" element={<Calendar />} />
//             <Route path="*" element={<Navigate to="/home" />} />
//           </Routes>
//         </div>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import Calendar from './Calendar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;