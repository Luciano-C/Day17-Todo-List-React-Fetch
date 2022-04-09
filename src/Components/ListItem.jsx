import React from "react";
import "../App.css";
import {useState} from "react";


export const ListItem = (props) => {
    // Variable de estado para mostrar u ocultar el botón
    const [isButtonshown, setIsButtonShown] = useState({display: "none"});
   
    // Variable intermedia que recibe la lista desde App
    const itemList = props.list;
   

    // Función para mostrar el botón 
    const showButton = () => {
        setIsButtonShown({display:"block"});
    }
    // Función para ocultar el botón
    const hideButton = () => {
        setIsButtonShown({display: "none"})
    }
    // Función para borrar item. Toma la lista de props, deja los que sean diferentes a props.value (que corresponde al texto en li). 
    // Luego manda lista actualizada a App
    const deleteItem = (value) => {
        let updatedList = itemList.filter(x => x !== value);
        // Manda lista actualizada a App
        props.passData(updatedList);
    }

     
    return (
        <div className="ListItemContainer"  onMouseEnter={() => {showButton()}} onMouseLeave={() => {hideButton()}}>
            <li id={props.id}>{props.value}</li>
            <div className="deleteButton" style={isButtonshown} onClick={() => {deleteItem(props.value)}}>X</div>
        </div>
    
    );
}