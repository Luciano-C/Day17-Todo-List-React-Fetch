import './App.css';
import { useState, useEffect } from "react";
import { ListItem } from "./Components/ListItem"
import { Loading } from "./Components/Loading"

function App() {

  const [itemList, setItemList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [listItemsHTML, setListItemsHTML] = useState([]);

  
  const getData = async () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/luckybollo")
    .then(response => response.json())
    .then(result => setDataFromListItem(result.map(x => x.label)))
    .catch(error => console.log('error', error));
  };

  useEffect(() => {
   getData();
  }, []);

  // Función auxiliar para que el ListItem pueda pasar la lista actualizada a App
  const [dataFromListItem, setDataFromListItem] = useState([]);
  const passData = (data) => {
    setDataFromListItem(data);
  };


  // Use effect que re-renderiza cuando la lista cambia.
  useEffect(() => {
    setItemList(dataFromListItem);
    setListItemsHTML(dataFromListItem.map((x, i) => <ListItem key={i} id={`task${i}`} value={x} list={itemList} passData={passData} />))
  }, [dataFromListItem, itemList])


  // Función para añadir item en el input
  const addItem = () => {
    setItemList(itemList.push(inputValue));
    let itemsToAdd = itemList.map((x, i) => <ListItem key={i} id={`task${i}`} value={x} list={itemList} passData={passData} />);
    setListItemsHTML(itemsToAdd);
    setInputValue("");
  }



  return (
    <div className="globalContainer">
      <h1 className='title'>To do</h1>
      <div className="paperContainer">
        <input id="inputToDo" type="text" onChange={e => setInputValue(e.target.value)} onKeyPress={e => { if (e.key === "Enter") { addItem() } }} value={inputValue} placeholder="What needs to be done?" />
        <div id="paper-1">
          <ul>{listItemsHTML.length > 0 ? listItemsHTML : <Loading/>}</ul>
          <p id='itemsLeft'>{itemList.length} items left</p>
        </div>
        <div id="paper-2"></div>
        <div id="paper-3"></div>
      </div>
    </div>

  );
}

export default App;
