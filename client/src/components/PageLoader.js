import { Box, CircularProgress } from "@mui/material";
export default function PageLoader() {
  return (
    <Box display="flex" justifyContent="center" py={10}>
      <CircularProgress size={80} />
    </Box>
  );
}
