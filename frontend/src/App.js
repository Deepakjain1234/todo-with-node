import './App.css';
import React from 'react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { Todos } from "./MyComponents/Todos";

import { AddTodo } from "./MyComponents/AddTodo";

import React, { useState, useEffect } from 'react';

// import imglink from './img/img-login.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Signin from './Components/Welcome'
import Frontpage from './Components/Frontpage';

function App() {


  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }


  const onDelete = (todo) => {
    console.log("I am ondelete of todo", todo);
    // Deleting this way in react does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    console.log("deleted", todos)
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])








  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/real'>
            <Frontpage />
          </Route>
          <Route exact path="/">
            <Signin imgLink={imglink} />
          </Route>
          <Route>
            <h1>404</h1>
          </Route>

          <Route exact path="/home" render={()=>{
            return(
            <>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} /> 
            </>)
          }}> 
          </Route>
          
        </Switch>
      </Router>
    </>
  );
}

export default App;
