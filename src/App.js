import './App.css';
import { useState, useEffect } from "react";
import { ListItem } from "./Components/ListItem"
import { Loading } from "./Components/Loading"
import { fetchPut } from './Functions/fetchPut';

function App() {

  const [itemList, setItemList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [listItemsHTML, setListItemsHTML] = useState([]);
  

  
  const getData = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/luckybollo")
    .then(response => response.json())
    .then(result => setDataFromListItem(result.map(x => x.label)))
    .catch(error => console.log('error', error));
  };

  useEffect(() => {
   getData();
   if (dataFromListItem > 0) {
    setIsLoading(false);
   }
  }, []);

  // Función auxiliar para que el ListItem pueda pasar la lista actualizada a App
  const [dataFromListItem, setDataFromListItem] = useState([]);
  const passData = (data) => {
    setDataFromListItem(data);
  };

  // Función auxiliar para desactivar el spinner despues de las eliminaciones, de modo tal que no aparezca cuando no hayan tareas.
  const [isLoading, setIsLoading] = useState(true);
  const passIsLoading = (value) => {
    setIsLoading(value);
  }


  // Use effect que re-renderiza cuando la lista cambia.
  useEffect(() => {
    setItemList(dataFromListItem);
    setListItemsHTML(dataFromListItem.map((x, i) => <ListItem key={i} id={`task${i}`} value={x} list={itemList} passData={passData} passIsLoading={passIsLoading} />));
  }, [dataFromListItem, itemList])


  // Función para añadir item en el input
  const addItem = () => {
    setItemList(itemList.push(inputValue));
    let itemsToAdd = itemList.map((x, i) => <ListItem key={i} id={`task${i}`} value={x} list={itemList} passData={passData} passIsLoading={passIsLoading}/>);
    setListItemsHTML(itemsToAdd);
    setInputValue("");
    
    // Se añade función que hace el fetch PUT
    fetchPut(itemList);
  };



  return (
    <div className="globalContainer">
      <h1 className='title'>To do</h1>
      <div className="paperContainer">
        <input id="inputToDo" type="text" onChange={e => setInputValue(e.target.value)} onKeyPress={e => { if (e.key === "Enter") { addItem() } }} value={inputValue} placeholder="What needs to be done?" />
        <div id="paper-1">
          <ul>{listItemsHTML.length > 0 ? listItemsHTML : <Loading isLoading={isLoading}/>}</ul>
          <p id='itemsLeft'>{itemList.length} items left</p>
        </div>
        <div id="paper-2"></div>
        <div id="paper-3"></div>
      </div>
    </div>

  );
}

export default App;
