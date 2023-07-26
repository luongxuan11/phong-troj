import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react"; //là một thành phần được sử dụng để đảm bảo rằng state của ứng dụng được lưu trữ và khôi phục sau khi làm mới trang.
import { Provider } from "react-redux"; //cho phép ứng dụng truy cập vào Redux store.
import reduxStore from "./redux"; // import từ redux
import { BrowserRouter } from "react-router-dom"; // route
import "./app.scss";
import "./resest.scss";

const { store, persistor } = reduxStore(); //lấy từ reduxStore  => store để chuyền prop vào Provider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}> {/* nhận prop từ store */}
    <PersistGate loading={null} persistor={persistor}> {/*time số loading để thêm hiệu ứng ui loading, persistStore => giữ lại state */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
reportWebVitals();
