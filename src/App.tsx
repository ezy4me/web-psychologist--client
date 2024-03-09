import { RouterProvider } from "react-router-dom";
import router from "./router";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { blue, indigo } from '@mui/material/colors';
import { ruRU } from '@mui/x-data-grid';

import 'dayjs/locale/ru';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const theme = createTheme(
  {
    palette: {
      primary: blue,
      secondary: indigo,
    },
  },
  ruRU,
);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;