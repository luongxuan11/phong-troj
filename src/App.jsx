import { Routes, Route} from "react-router-dom";
import { Home, Login, HomeTitle, DetailPost } from "./containers/public";
import {SearchDetail} from "./containers/smallComponent"
import { path } from "./utilities/constant";
import {ChoThueAll} from './containers/chothueAll/index'

function App() {

  return (
    <div>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={'*'} element={<HomeTitle />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<ChoThueAll />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<ChoThueAll />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<ChoThueAll />} />
          <Route path={path.NHA_CHO_THUE} element={<ChoThueAll />} />
          <Route path={path.SEARCH} element={<SearchDetail/>}/>
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
          <Route path={"chi-tiet/*"} element={<DetailPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
