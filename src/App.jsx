import { useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import { Home, Login, HomeTitle, DetailPost } from "./containers/public";
import {SearchDetail} from "./containers/smallComponent"
import { path } from "./utilities/constant";
import {ChoThueAll, Contact} from './containers/public'
import {System, CreatePost, ManagePost, EditAccount} from './containers/System'
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions"

function App() {
  // useEffect(()=>{
  //   setTimeout(() =>{
  //     isLoggedIn && dispatch(actions.getCurrent())
  //   }, 1000)
  // }, [isLoggedIn])
  //có 2 cách 1 là gọi ở đây 2 là ở file home
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(actions.getCategories())
   dispatch(actions.getPrices())
   dispatch(actions.getAcreage())
   dispatch(actions.getProvince())
 }, [])

  // const {isLoggedIn} = useSelector((state) => state.auth)
//   useEffect(() =>{
//     isLoggedIn && dispatch(actions.getCategories())
//  }, [isLoggedIn])
 
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
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={`${path.DETAIL_POST}/*`} element={<DetailPost />} />
        </Route>
        <Route path={path.SYSTEM} element={<System/>}>
            <Route path={path.CREATE_POST} element={<CreatePost/>}/>
            <Route path={path.MANAGE_POST} element={<ManagePost/>}/>
            <Route path={path.EDIT_ACCOUNT} element={<EditAccount/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
