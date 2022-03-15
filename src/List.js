import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function List({ items, removeItem, editItem }) {
    
  return (
    <div className="grocery-list">
        
      {items.map((item) => {
        const { id, title } = item;
        console.log(item)
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn" onClick={()=>editItem(id)}>
                <FaEdit />
                edit
              </button>
              <button type="button" className="delete" onClick={()=>removeItem(id)}>
                <FaTrash />
                delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
