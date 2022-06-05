import '../styling/Answer.css';
import { useEffect, useState } from 'react';

function Answer({ answer}) {

  return (
    <div className="Answer">
        <div id='Answer-container'>
            <button>{answer}</button>
        </div>
    </div>
  );
}

export default Answer;