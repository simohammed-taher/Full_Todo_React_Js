import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useContext, useEffect, useMemo } from "react";
import { TodosContext } from "../contexts/todosContext";
import { ToastContext } from "../contexts/toastContext";
export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const { showHideToast } = useContext(ToastContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // function handleCheckClick(todoId) {
  //   const updatedTodos = todos.map((t) => {
  //     if (t.id === todoId) {
  //       t.isCompleted = !t.isCompleted;
  //     }
  //     return t;
  //   });
  //   setTodos(updatedTodos);
  // }

  //filteration arrays
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("Completed");
      return t.isCompleted;
    });
  }, [todos]);
  const notcompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("Not-Completed");
      return !t.isCompleted;
    });
  }, [todos]);
  let todosToBeRendered = todos;
  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "incomplete") {
    todosToBeRendered = notcompletedTodos;
  } else {
    todosToBeRendered = todos;
  }
  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    showHideToast("Add successfully");
  }
  return (
    <Container maxWidth="md">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" style={{ fontFamily: "A" }}>
            My Programme To day 💻{" "}
          </Typography>
        </CardContent>
        <Divider />
        <ToggleButtonGroup
          color="primary"
          exclusive
          aria-label="Platform"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
          value={displayedTodosType}
          onChange={changeDisplayedType}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
          <ToggleButton value="incomplete">Incomplete</ToggleButton>
        </ToggleButtonGroup>
        {/* <Todo /> */}
        {todosJsx}
        <Grid container style={{ margin: "20px" }} spacing={2}>
          <Grid
            xs={8}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <TextField
              id="outlined-basic"
              label="Titre"
              variant="outlined"
              style={{ width: "100%" }}
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </Grid>{" "}
          <Grid
            xs={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button
              variant="contained"
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                handleAddClick();
              }}
              disabled={titleInput.length == 0}
            >
              ADD
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
