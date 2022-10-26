import { useEffect, useState } from "react";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import axios from "axios";

const Widget2_1 = ({ setLoading }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await axios.get("/api/getWidget2Data");
      setData(result.data);
      setLoading(false);
    })();
  }, []);

  const currentData = data
    ? {
        labels: Object.keys(data),
        datasets: [
          {
            label: "New cases",
            data: Object.values(data),
            borderColor: "#a8bf24",
            backgroundColor: "#a8bf24"
          }
        ]
      }
    : {};
  return data && <BarChart data={currentData} />;
};

export default withWidgetChildrenLoader(Widget2_1);
