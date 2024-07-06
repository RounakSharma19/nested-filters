import { Provider } from "react-redux";
import { NestedFilter } from "./features";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <NestedFilter />
    </Provider>
  );
}

export default App;
