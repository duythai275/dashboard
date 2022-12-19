import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import ButtonFilter from "./ButtonFilter";

import "./index.css";
const HeaderNav = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        p: "5px 0",
      }}
    >
      <ButtonFilter />
    </Box>
  );
};

export default HeaderNav;
