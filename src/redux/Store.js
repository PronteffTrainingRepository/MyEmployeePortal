import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { RootReducer } from "./Rootreducer";

export const Store = createStore(RootReducer, compose(applyMiddleware(thunk)));
