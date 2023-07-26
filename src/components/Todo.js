import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ToastContext } from "../contexts/toastContext";

export default function Todo({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = React.useState(false);
  const { showHideToast } = useContext(ToastContext);

  const [updatedTodo, setUpdatedTodo] = React.useState({
    title: todo.title,
    details: todo.details,
  });

  const { todos, setTodos } = useContext(TodosContext);

  // EVENT HANDLER
  function handleCheckClick() {
    // handleCheck(todo.id);
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("Updated successfully");
  }
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
  function handleDeleteDialogConfirm() {
    setShowDeleteDialog(false);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  function handleDeletConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("Deleted successfully");
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("Updated successfully");
  }
  // EVENT HANDLER
  return (
    <div>
      {/* DELETE MODAL */}
      <Dialog
        onClose={handleDeleteDialogConfirm}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          wach mnaytak bari tmsah 😶
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            rah wlah la rja3 lik lhistorik kon rajal😎
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogConfirm}>Annuler</Button>
          <Button autoFocus onClick={handleDeletConfirm}>
            Yes Delete --- 👌
          </Button>
        </DialogActions>
      </Dialog>
      {/* DELETE MODAL */}
      {/* Edit MODAL */}
      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          bari tbadal ach kayn fl had nhar
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titre"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />{" "}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Annuler</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            Yes Updated ✔
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit MODAL */}
      <Card sx={{ minWidth: 275 }} className="todoCard">
        <CardContent
          style={{
            backgroundColor: "#1818CA",
            margin: "10px",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} style={{ color: "white" }}>
              <Grid xs={8}>
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "B",
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </Typography>
                <Typography variant="h6">{todo.details}</Typography>
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <IconButton
                  aria-label="check"
                  className="iconButton"
                  style={{
                    color: todo.isCompleted ? "white" : "#8bc34a",
                    background: todo.isCompleted ? "#8bc34a" : "white",
                    border: "solid #8bc34a 3px",
                  }}
                  onClick={() => {
                    handleCheckClick();
                  }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={handleUpdateClick}
                  aria-label="edit"
                  className="iconButton"
                  style={{
                    color: "#1769aa",
                    background: "white",
                    border: "solid #1769aa 3px",
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  className="iconButton"
                  style={{
                    color: "red",
                    background: "white",
                    border: "solid red 3px",
                  }}
                  onClick={handleDeleteClick}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
