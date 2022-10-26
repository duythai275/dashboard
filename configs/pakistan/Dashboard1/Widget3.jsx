import { useState, useEffect } from "react";
import DataGrid from "@/components/Widgets/DataGrid";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import axios from "axios";
import { sortStringInArrayOfObject } from "@/config/utils";

const Widget3 = ({ setLoading, apiUrl }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await axios.get(apiUrl);
      setData(result.data);
      setLoading(false);
    })();
  }, []);
  let columns = [];
  let rows = [];

  if (data) {
    columns = Object.keys(data.data).map((column) => ({ defaultFlex: 1, name: column, header: column }));
    columns = sortStringInArrayOfObject(columns, "name");
    columns.unshift({ defaultFlex: 3, name: "ou", header: "Org units / Period" });
    rows = Object.keys(data.ous)
      .map((ou) => {
        const ouName = data.ous[ou];
        const row = {
          ou: ouName
        };

        Object.keys(data.data).forEach((column) => {
          const value = data.data[column][ouName];
          if (value) {
            row[column] = value;
          }
        });
        return row;
      })
      .filter((row) => Object.keys(row).length > 1);
  }

  return <DataGrid columns={columns} rows={rows} />;
};

export default withWidgetChildrenLoader(Widget3);
