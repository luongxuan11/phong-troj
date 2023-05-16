import authReducer from "./authReducer";
import userReducer from "./userReducer";
import {combineReducers} from 'redux' // Hàm này giúp gom các reducer lại thành một reducer lớn để đưa vào cấu hình cho middleware redux-persist.
import storage  from 'redux-persist/lib/storage'  // khi reload trang thì giá trị k đổi nên sẽ lưu nó dưới local
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2"; // là một phương thức giải quyết xung đột được sử dụng trong redux-persist để đối phó với 
                                            // các trường hợp có xung đột giữa các phiên bản trạng thái Redux trong quá trình merge các phiên bản khác nhau của ứng dụng.

import persistReducer from "redux-persist/es/persistReducer";

const commonConfig = {  // biến thành 1 obj
    storage,
    stateReconciler: autoMergeLevel2  // sử lý các xung đột với stateReconciler là method được define sẵn
    // stateReconciler để xác định cách thức sửa chữa các state có trùng lặp nhau.
}

const authConfig = {
    ...commonConfig,
    key: 'auth', //key xác định tên cho phần state được lưu trữ trong bộ nhớ cục bộ
    whitelist: ['isLoggedIn', 'token'] //whitelist chỉ định các thuộc tính của state cần được lưu trữ trong bộ nhớ cục bộ, trong trường hợp này chỉ có isLoggedIn và token.
}

const rootReducer = combineReducers({  // như trên đã nói hàm combine này gán cho biến có tên là rootRe...
    auth: persistReducer(authConfig, authReducer),
    user: userReducer
})

export default rootReducer  //export ra