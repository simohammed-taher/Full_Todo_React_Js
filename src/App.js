import * as React from "react";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastContext } from "./contexts/toastContext";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import MySnackBar from "./components/MySnackBar";
const theme = createTheme({
  typography: {
    fontFamily: ["A", "B", "C"],
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});
const initialTodos = [
  {
    id: uuidv4(),
    title: "day1",
    details: "walooooooooooo waloooooooooooooo",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "day2",
    details: "walooooooooooo waloooooooooooooo",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "daY3",
    details: "walooooooooooo waloooooooooooooo",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = React.useState(initialTodos);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{ showHideToast }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            height: "100vh",
            // direction: "ltr",
          }}
        >
          <MySnackBar open={open} message={message} />
          <TodosContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}

export default App;
