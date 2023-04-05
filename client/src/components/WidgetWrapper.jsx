import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  backgroundColor: theme.palette.background.alt,
}));
