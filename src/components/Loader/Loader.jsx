import { CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 9999,
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#ffffff"
      }}
    >
      <CircularProgress size={80} thickness={2} />
      <div style={{ paddingTop: 15 }}>
        <Typography>{t("loading")}</Typography>
      </div>
    </div>
  );
};
export default Loader;
