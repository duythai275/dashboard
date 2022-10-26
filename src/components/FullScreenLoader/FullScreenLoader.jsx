import { Dialog, CircularProgress, Typography } from "@mui/material";

const FullScreenLoader = ({ open }) => {
  return (
    <Dialog open={open}>
      <div
        style={{
          width: 300,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <CircularProgress size={150} thickness={1} />
        <div style={{ marginTop: 20 }}>
          <Typography>Initialization...</Typography>
        </div>
      </div>
    </Dialog>
  );
};
export default FullScreenLoader;
