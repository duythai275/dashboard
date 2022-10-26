import { useEffect, useState } from "react";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import axios from "axios";

const Widget2 = ({ setLoading, apiUrl }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await axios.get(apiUrl);
      setData(
        Object.entries(result.data)
          .sort((a, b) => (a[0] <= b[0] ? -1 : 1))
          .reduce((acc, pair) => {
            acc[pair[0]] = pair[1];
            return acc;
          }, {})
      );
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

export default withWidgetChildrenLoader(Widget2);
