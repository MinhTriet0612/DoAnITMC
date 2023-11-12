import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
