import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

import { pull } from "../../utils";

const Widget4 = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard4Widget4Data");
      const response = {};
      response.data = resultData.data.rows.map((row) => ({
        value: row[1]
      }));
      setResult(response);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    (async () => {
      setData(result.data[0].value * 1);
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return (
    data && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        {/* <Typography sx={{ fontSize: "12px", color: "#666666" }}>Total family members registered</Typography> */}
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>{data.toLocaleString("en-US")}</Typography>
      </Box>
    )
  );
};
export default withWidgetChildrenLoader(Widget4);
