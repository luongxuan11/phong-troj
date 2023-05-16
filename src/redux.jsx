import rootReducer from "./store/reducers/rootReducer";
import persistStore from "redux-persist/es/persistStore"; //đảm bảo rằng dữ liệu của ứng dụng vẫn được giữ nguyên sau khi ứng dụng đã tắt hoặc làm mới lại.
import { createStore } from "redux"

const reduxStore = () =>{
    const store = createStore(rootReducer)
    const persistor = persistStore(store)

    return {store, persistor}
}
export default reduxStore