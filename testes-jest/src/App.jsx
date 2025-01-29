import { useState } from "react";

function App() {
  const [tarefas, setTarefas] = useState([])
  const [tarefaTemp, settarefaTemp] = useState('')

  function cadastrarTarefa() {
    if(tarefaTemp.length === 0){
      return
    }else{
      setTarefas([...tarefas, tarefaTemp])
      settarefaTemp('')
    }
  }
  
  return (
    <div className="App">
      <input type="text" value={tarefaTemp} onChange={e => settarefaTemp(e.target.value)} />
      <button onClick={cadastrarTarefa} type="button">cadastrar</button>
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>{tarefa}</li>
        )
        )}
      </ul>
    </div>
  );
}

export default App;
