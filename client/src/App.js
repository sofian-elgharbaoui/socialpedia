import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import themeSettings from "./theme";

export default function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* pass your components here*/}
      </ThemeProvider>
    </div>
  );
}
