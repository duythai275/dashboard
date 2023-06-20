import BarChart from "@/components/Widgets/BarChart";
import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

const modalWrapperStyle = (w, h) => ({
  p: 4,
  pb: 8,
  width: w || "75dvw",
  height: h || "65dvh",
  borderRadius: 3,
  bgcolor: "background.paper",
  boxShadow: 24,
  position: "relative",
});

const ModalBarChart = ({ title, barData, open, onClose, w, h }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={modalWrapperStyle(w, h)}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 5, right: 5 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" sx={{ textAlign: "center" }}>
          {t(title)}
        </Typography>
        <Divider sx={{ m: 2, mt: 1 }} />
        <BarChart data={barData} />
      </Box>
    </Modal>
  );
};

export default ModalBarChart;
