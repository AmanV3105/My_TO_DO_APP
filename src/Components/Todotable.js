import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../actions";
import { styled } from "@mui/system";

// Styled components
const StyledTableCell = styled(TableCell)({
  fontWeight: '600',
  color: '#333',
  padding: '16px',
  borderRight: '1px solid #ddd', // Add vertical line between cells
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey ? theme.palette.grey[100] : '#f5f5f5', // Fallback to a default color
  },
}));

const Todotable = () => {
  const todoList = useSelector((state) => state.allReducers.todoList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to determine priority order
  const getPriorityOrder = (priority) => {
    if (priority === "High") return 1;
    if (priority === "Medium") return 2;
    if (priority === "Low") return 3;
  };

  // Sorting todos based on priority and date
  const sortedTodos = [...todoList].sort((a, b) =>
    a.data.priority !== b.data.priority ? getPriorityOrder(a.data.priority) - getPriorityOrder(b.data.priority) : new Date(a.data.date) - new Date(b.data.date)
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Task</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell>Priority</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTodos.map((elem) => (
              <StyledTableRow key={elem.id}>
                <TableCell sx={{fontWeight:"800",fontSize:"1rem"}}>{elem.data.title}</TableCell>
                <TableCell sx={{fontWeight:"800", fontSize:"1rem"}}>{elem.data.date}</TableCell>
                <TableCell sx={{fontWeight:"800", fontSize:"1rem"}}>{elem.data.priority}</TableCell>
                <TableCell>
                  <BorderColorIcon
                    sx={{ cursor: 'pointer', color: 'blue', marginRight: 2 }}
                    onClick={() => navigate(`/?id=${elem.id}`)}
                  />
                  <DeleteIcon
                    sx={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => {
                      dispatch(deleteTodo(elem.id));
                    }}
                  />
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Link to="/">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: 2,
            cursor: "pointer",
            boxShadow: 2,
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          <AddIcon />
          <span style={{ marginLeft: "8px", fontWeight:"800", textDecoration : "none", fontSize:"1rem"}}>Add Todo</span>
        </Box>
      </Link>
    </>
  );
};

export default Todotable;
