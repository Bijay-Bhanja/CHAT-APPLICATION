import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Chat/>} path="/"/>
        <Route element={<Register/>} path="/register"/>
        <Route element={<Login/>} path="/login"/>
        <Route element={<Chat/>} path="/chat"/>
        <Route element={<SetAvatar/>} path="/setavatar"/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
