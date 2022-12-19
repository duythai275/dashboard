import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const FilterByService = ({
  listDataElement,
  selectedServices,
  setSelectedServices,
}) => {
  const { t } = useTranslation();

  const listOption = useMemo(() => {
    return (
      listDataElement &&
      listDataElement.length &&
      listIdServices.map((item) => listDataElement.find((de) => de.id === item))
    );
  }, [JSON.stringify(listDataElement)]);

  return (
    <Box>
      <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
        {t("filterByService")}
      </Typography>
      {listOption && listOption.length && (
        <>
          {listOption.map((de) => {
            return (
              <FormControlLabel
                value={de.id}
                control={
                  <Checkbox
                    checked={selectedServices.includes(de.id) ? true : false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedServices([
                          ...selectedServices,
                          e.target.value,
                        ]);
                      } else {
                        setSelectedServices(
                          selectedServices.filter(
                            (item) => item !== e.target.value
                          )
                        );
                      }
                    }}
                  />
                }
                label={de.displayFormName.replace("Fixed Services", "")}
              />
            );
          })}
        </>
      )}
    </Box>
  );
};

export default FilterByService;

const listIdServices = [
  "Ma4Dd0uqxep",
  "vumJG0H4td0",
  "ETsCgWQ1Obj",
  "WWvCIKggfQ2",
  "qZqBTVe9ZRu",
  "rcZq4tp5CPR",
  "jSDNrfCBMV4",
  "HaTqknp8ima",
  "J3H3ebrkuWi",
  "Mci4seBpbFB",
  "uptC4fB4s3l",
  "D23IlrmwvD5",
  "hl1Fe0KUYWY",
  "dYAhnw1uelD",
  "MjjHi9DRtIV",
  "nrirjOFhQ1V",
  "RB7QklJZYbp",
  "RG6UNcO82tR",
  "AhoQN3yIazk",
  "X1MIN0lBUQ7",
  "OjS44Bny3WL",
  "Q38v4gRDV9B",
];
