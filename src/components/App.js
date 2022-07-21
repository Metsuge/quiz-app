import "../styling/App.css";
import QuizComponent from "./QuizComponent";
import {Provider} from "react-redux";
import store from "../redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div id="quiz-container">
          <QuizComponent />
        </div>
      </div>
    </Provider>
  );
}

export default App;
