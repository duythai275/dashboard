import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import FilterListIcon from "@mui/icons-material/FilterList";

import ButtonLoading from "../ButtonLoading";
import CustomModal from "../Modal";
import Filter from "../Filter";

import "./index.css";
const HeaderNav = ({ onFilterClose, onFilterReset }) => {
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
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: "end",
        }}
      >
        <CustomModal
          renderButton={(handleOpen) => {
            return (
              <ButtonLoading
                onClick={handleOpen}
                variant="outlined"
                sx={{
                  borderColor: "#2880CA",
                  color: "#2880CA",
                }}
                disabled={false}
                icon={<FilterListIcon />}
              >
                {t("filter")}
              </ButtonLoading>
            );
          }}
        >
          <Filter onClose={onFilterClose} onReset={onFilterReset} />
        </CustomModal>
      </Box>
    </Box>
  );
};

export default HeaderNav;
