import React, { useEffect } from "react";
import "./Todoform.css";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addtodo, updateTodo } from "../actions";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from '@mui/material/Alert'; // Importing Alert from Material-UI

const Todoform = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const todoList = useSelector((state) => state.allReducers.todoList);
  const [todo, setTodo] = React.useState({
    title: "",
    date: "",
    priority: "Low",
  });
  const [alertMessage, setAlertMessage] = React.useState(""); // State for alert message
  const [alertSeverity, setAlertSeverity] = React.useState("error"); // Severity of the alert (error or success)
  
  useEffect(() => {
    if (id) {
      // If an ID is present, populate the form with the corresponding todo
      const todoToEdit = todoList.find((todo) => todo.id === id);
      if (todoToEdit) {
        setTodo(todoToEdit.data);
      }
    }
  }, [id, todoList]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.title || !todo.date || !todo.priority) {
      setAlertMessage("Please fill all the fields");
      setAlertSeverity("error");
      return;
    }
    if (id) {
      // Update existing todo
      dispatch(updateTodo(id, todo));
      setAlertMessage("Todo updated successfully!");
      setAlertSeverity("success");
    } else {
      // Add new todo
      dispatch(addtodo(todo));
      setAlertMessage("Todo added successfully!");
      setAlertSeverity("success");
    }
    navigate("/table"); // Redirect back to the table
  };

  return (
    <div>
      <form className="todo-form">
        <h3 className="heading">Add a ToDo</h3>
        
        {/* Alert Display */}
        {alertMessage && (
          <Alert severity={alertSeverity} sx={{ marginBottom: "1rem" }}>
            {alertMessage}
          </Alert>
        )}
        
        <textarea
          type="text"
          placeholder="Add a task"
          className="todo-input"
          name="title"
          value={todo.title}
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Due Date"
          className="todo-input"
          name="date"
          value={todo.date}
          onChange={handleChange}
        />
        <Box sx={{ minWidth: "83%", border: "1px solid #000", marginBottom: "1rem", borderRadius: "5px" , fontSize: "1rem", fontWeight: "bold"}}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={todo.priority}
              name="priority"
              onChange={handleChange}
              sx={{ fontWeight: "800" }}
            >
              <MenuItem value="Low" sx={{fontWeight: "800"}}>Low</MenuItem>
              <MenuItem value="Medium" sx={{fontWeight: "800"}}>Medium</MenuItem>
              <MenuItem value="High" sx={{fontWeight: "800"}}>High</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <button className="todo-button" onClick={handleSubmit}>
          {id ? "Update Todo" : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default Todoform;
