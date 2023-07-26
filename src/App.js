import * as React from "react";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
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

  return (
    <ThemeProvider theme={theme}>
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
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
