import {combineReducers} from 'redux' // Hàm này giúp gom các reducer lại thành một reducer lớn để đưa vào cấu hình cho middleware redux-persist.
import storage  from 'redux-persist/lib/storage'  // khi reload trang thì giá trị k đổi nên sẽ lưu nó dưới local
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2"; // là một phương thức giải quyết xung đột được sử dụng trong redux-persist để đối phó với 
// các trường hợp có xung đột giữa các phiên bản trạng thái Redux trong quá trình merge các phiên bản khác nhau của ứng dụng.
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postReducer from './postReducer';
import appReducer from './appReducer';

import persistReducer from "redux-persist/es/persistReducer";
//Trong ngữ cảnh của Redux Persist, "persist" có nghĩa là "lưu trữ persist" hoặc "duy trì trạng thái". Redux Persist là một thư viện Redux middleware cho phép bạn lưu trữ và duy trì trạng thái Redux của ứng dụng qua các phiên làm việc.

const commonConfig = {  // biến thành 1 obj
    storage, // config nơi lưu là storage
    stateReconciler: autoMergeLevel2  // sử lý các xung đột với stateReconciler là method được define sẵn
    // stateReconciler để xác định cách thức sửa chữa các state có trùng lặp nhau.
}

const authConfig = { 
    ...commonConfig,  // 1 obj ở trên lưu trữ và merge
    key: 'auth', //key xác định tên cho phần state được lưu trữ trong bộ nhớ cục bộ // nhìn ở aplication thì sẽ thấy persist: auth
    whitelist: ['isLoggedIn', 'token'] //whitelist chỉ định các thuộc tính của state cần được lưu trữ trong bộ nhớ cục bộ, trong trường hợp này chỉ có isLoggedIn và token.
}

const rootReducer = combineReducers({  // như trên đã nói hàm combine này gán cho biến có tên là rootReducer
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    post: postReducer,
    app: appReducer  // bên nơi nhận sẽ dùng uselect
})

export default rootReducer  //export ra file redux