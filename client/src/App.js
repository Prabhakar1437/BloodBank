import {BrowserRouter , Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import PublicPage from "./components/PublicPage";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Profile from "./pages/Profile";


function App() {
  const {loading} = useSelector((state)=> state.loaders);
  return (
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home/></ProtectedPage>} />
          <Route path="/profile" element={<ProtectedPage><Profile/></ProtectedPage>} />
          <Route path="/login" element={<PublicPage><Login/></PublicPage>} />
          <Route path="/register" element={<PublicPage><Register/></PublicPage>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
