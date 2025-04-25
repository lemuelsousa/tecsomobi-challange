import { Alert, Box, Collapse } from "@mui/material";

interface AlertBoxProps {
  show: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export default function AlertBox({
  show,
  message,
  severity = "success",
}: AlertBoxProps) {
  return (
    <Collapse in={show}>
      <Box
        position="fixed"
        top={20}
        left="50%"
        sx={{
          transform: "translateX(-50%)",
          zIndex: 1500,
          maxWidth: 400,
          width: "90%",
        }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Box>
    </Collapse>
  );
}
