import {configureStore} from "@reduxjs/toolkit";
// import APIreducer from "./fetchAPIData/APIreducer";

import rootReducer from "./rootReducer";

const store = configureStore({reducer: rootReducer});

export default store;
