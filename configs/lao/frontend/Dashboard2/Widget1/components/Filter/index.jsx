import { Box, Button, CircularProgress } from "@mui/material";
import { pull } from "../../../../utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import FilterByCategory from "./FilterByCategory";
import FilterByOwnership from "./FilterByOwnership";
import FilterByService from "./FilterByService";

const Filter = ({ onClose, onReset }) => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedOwnerships, setSelectedOwnerships] = useState([]);

  const [categoryOptions, setCategoryOptions] = useState(null);
  const [ownershipOptions, setOwnershipOptions] = useState(null);
  const [listDataElementOfService, setListDataElementOfService] =
    useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const result = await pull("/api/getD2W1FilterData");
      console.log(result);
      setCategoryOptions(result?.data.categories);
      setOwnershipOptions(result?.data.ownerships);
      setListDataElementOfService(result?.data.services);

      setLoading(false);
    })();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100%",
      }}
    >
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={80} thickness={2} sx={{ marginBottom: 2 }} />
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", flexDirection: "row", gap: "20px", flex: "1" }}
        >
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              position: "relative",
              "&::after": {
                position: "absolute",
                content: '""',
                top: "50%",
                transform: "translateY(-50%)",
                right: "0",
                width: "1px",
                height: "80%",
                backgroundColor: "#808080",
              },
            }}
          >
            <FilterByCategory
              options={categoryOptions}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />

            <FilterByOwnership
              options={ownershipOptions}
              selectedOwnerships={selectedOwnerships}
              setSelectedOwnerships={setSelectedOwnerships}
            />
          </Box>
          <Box sx={{ flex: "1" }}>
            <FilterByService
              listDataElement={listDataElementOfService}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
            />
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          sx={{
            alignSelf: "end",
            width: "fit-content",
            backgroundColor: "#FFC107",
            color: "black",
            ["&:hover"]: { backgroundColor: "rgba(255, 193, 7, 0.5)" },
          }}
          onClick={() => {
            onReset();
            setSelectedCategories([]);
            setSelectedServices([]);
            setSelectedOwnerships([]);
          }}
        >
          {t("reset")}
        </Button>
        <Button
          variant="contained"
          sx={{
            alignSelf: "end",
            width: "fit-content",
            backgroundColor: "#2880CA",
            color: "white",
          }}
          onClick={() => {
            onClose({
              selectedServices,
              selectedCategories,
              selectedOwnerships,
            });
          }}
        >
          {t("filter")}
        </Button>
      </Box>
    </Box>
  );
};

export default Filter;
