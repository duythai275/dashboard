import BarChart from "@/components/Widgets/BarChart";
import { Box, Divider, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const modalWrapperStyle = {
  p: 4,
  pb: 8,
  width: 1000,
  height: "50dvh",
  borderRadius: 3,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const ModalBarChart = ({ title, barData, open, onClose }) => {
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
      <Box sx={modalWrapperStyle}>
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
