import "./App.css";
import "./tailwind.css";
import User from "./modules/User";
import AllPostsContext from "./store/AllPostContext";
import MainContext from "./store/MainContext";
import Admin from "./modules/Admin";

function App() {
  return (
    <div className="App">
      <MainContext>
        <AllPostsContext>
          <User />
        </AllPostsContext>
        <Admin />
      </MainContext>
    </div>
  );
}

export default App;
