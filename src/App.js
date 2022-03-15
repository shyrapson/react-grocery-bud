import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () =>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
  // after creating the local storage we will now call the function in the list state
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type:'' });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    //1 if name has no value  display alert
  
    if (!name) {
      //display alert
      // let make it dynamic by calling a function
      // setAlert({show:true, msg:'please enter a message', type:'danger'})
      showAlert(true,'danger','please enter a message');
        //2 else if name has a value and isEditing is true
    } else if (name && isEditing) {
         setList(
           list.map((item) => {
           if(item.id === editID) {
             return {...item, title:name}
           }
           return item
         }))
         setName('');
         setEditID(null);
         setIsEditing(false);
         showAlert(true,'success','value changed')
    } else {
               showAlert(true,'success','item added to the list')
      // the item to be add will have the id of new date and title
      // the value that come from name state is asign to title
      const newItem = { id: new Date().getTime().toString(), title: name };
      // new item is push to setList
      // ...list copies previous list item, then newitem is added after it
      setList([...list, newItem]);
      setName("");
    }
  };
  // es6 syntax to store value 
const showAlert = (show=false,type="",msg="")=>{
  setAlert({show,type,msg})
}

// clearing the list
const clearList = () => {
  showAlert(true,'danger', 'empty list');
  setList([])
}
// remove individual item
const removeItem = (id) => {
  showAlert(true, 'danger', 'item removed');
 const newItem = list.filter((item)=>item.id !== id);
 setList(newItem)
};
// edit item
const editItem = (id) => {
           const specificItem = list.find((item)=> item.id === id);
           setIsEditing(true);
           setEditID(id)
          //  seting the specific item name which is title b4 sending it back list
           setName(specificItem.title)
}
// calling out the local storage anytime something change using the useeffect
// adding item to local storage
useEffect (()=>{
localStorage.setItem('list', JSON.stringify(list))
},[list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/*1 if alert.show is true the display alert.  
         2 copy all the state properties in the alert*/}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* if isEditing is true then edit else submit */}
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {/* show the grocery container only when the list item is greater than 0 */}
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
