import LoginPopup from "./components/LoginPopup";
import Navbar from "./components/Navbar";
import { Post } from "./components/Post";

function App() {
  return (
    <div>
      <Navbar/>
      <div className="flex flex-col  items-center mb-2">
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <LoginPopup/>
      </div>
    </div>
  );
}

export default App;
