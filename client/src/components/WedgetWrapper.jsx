import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const WedgetWrapper = styled(Box)(({ theme }) => ({
  padding: 16,
  borderRadius: 14,
  backgroundColor: theme.palette.background.alt,
}));
