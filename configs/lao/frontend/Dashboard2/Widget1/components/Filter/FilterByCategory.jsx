import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const FilterByCategory = ({
  options,
  setSelectedCategories,
  selectedCategories,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
        {t("filterByCategory")}
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
                      selectedCategories.includes(vs.code) ? true : false
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([
                          ...selectedCategories,
                          e.target.value,
                        ]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter(
                            (item) => item !== e.target.value
                          )
                        );
                      }
                    }}
                  />
                }
                label={vs.displayFormName}
              />
            );
          })}
        </>
      )}
    </Box>
  );
};

export default FilterByCategory;
