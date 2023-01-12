
import "./App.css";
import "./tailwind.css";
import User from "./modules/User";
import AllPostsContext from "./store/AllPostContext";
import MainContext from "./store/MainContext";
import Admin from "./modules/Admin";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <MainContext>
        <AllPostsContext>
          <User />
        </AllPostsContext>
        <Provider store={store}>
          <Admin />
        </Provider>
      </MainContext>
    </div>
  );
}

export default App;
