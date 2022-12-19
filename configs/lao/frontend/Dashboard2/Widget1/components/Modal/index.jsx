import { useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { cloneElement } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80%, calc(100vw - 60px))",
  height: "max(calc(100vh - 80px), 80%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "50px 30px",
  overflow: "auto",
  maxWidth: "90%",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const CustomModal = ({ renderButton, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {renderButton && renderButton(handleOpen)}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: "10000",
          padding: "50px 0",
        }}
      >
        <>
          <CloseIcon
            onClick={handleClose}
            sx={{
              position: "fixed",
              top: "60px",
              right: "12%",
              zIndex: "9999",
              alignSelf: "end",
              fill: "#FF6347",
              cursor: "pointer",
              width: "30px",
              height: "30px",
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: "50%",
              padding: "5px",
            }}
          />
          <Box sx={style}>
            {cloneElement(children, { handleClose: handleClose })}
          </Box>
        </>
      </Modal>
    </>
  );
};

export default CustomModal;
