import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const FilterByOwnership = ({
  options,
  setSelectedOwnerships,
  selectedOwnerships,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
        {t("filterByOwnership")}
      </Typography>
      {options && options.length && (
        <>
          {options.map((vs) => {
            return (
              <FormControlLabel
                value={vs.code}
                control={
                  <Checkbox
                    checked={
                      selectedOwnerships.includes(vs.code) ? true : false
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOwnerships([
                          ...selectedOwnerships,
                          e.target.value,
                        ]);
                      } else {
                        setSelectedOwnerships(
                          selectedOwnerships.filter(
                            (item) => item !== e.target.value
                          )
                        );
                      }
                    }}
                  />
                }
                label={vs.name}
              />
            );
          })}
        </>
      )}
    </Box>
  );
};

export default FilterByOwnership;
