import '../styling/App.css';
import QuizComponent from './QuizComponent';

import { useEffect, useState } from 'react';
import QuizState from '../context/QuizState';

function App() {

return (
    <div className="App">
      <div id='quiz-container'>
      <QuizState>
        {<QuizComponent />}
      </QuizState>
      </div>
    </div>
  );
}

export default App;
