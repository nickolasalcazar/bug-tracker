import { Box, CircularProgress } from "@mui/material";
export default function PageLoader() {
  return (
    <Box display="flex" justifyContent="center" pt={25}>
      <CircularProgress size={80} />
    </Box>
  );
}
