import { Routes, Route } from "react-router-dom";
import { Home, Login } from "./containers/public";
import { path } from "./utilities/constant";

function App() {
  return (
    <div>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
