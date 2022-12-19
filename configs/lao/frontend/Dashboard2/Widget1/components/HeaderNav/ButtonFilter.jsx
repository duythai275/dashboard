import { Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTranslation } from "react-i18next";

import ButtonLoading from "../ButtonLoading";
import CustomModal from "../Modal";
import Filter from "../Filter";

const ButtonFilter = () => {
  const { t } = useTranslation();
  return (
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
        <Filter />
      </CustomModal>
    </Box>
  );
};

export default ButtonFilter;
