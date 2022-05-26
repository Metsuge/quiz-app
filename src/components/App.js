import '../styling/App.css';
import QuizComponent from './QuizComponent';
import { useEffect, useState } from 'react';





function App() {

const [ APIData, setAPI] = useState();
useEffect(()=>{
  const fetchAPI = async () => {
    const data = await fetch ('https://opentdb.com/api.php?amount=10&type=multiple');

    const json =  await data.json();

    setAPI(json.results);
  };

  fetchAPI()
  .catch(console.error);
}, [])  



return (
    <div className="App">
      {<QuizComponent data={APIData} />}
      
    </div>
  );
}

export default App;
