import { useEffect, useState } from "react";
import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import axios from "axios";
import moment from "moment";

const Widget4 = ({ setLoading, apiUrl }) => {
  const [data, setData] = useState(null);
  const currentYear = moment().year();
  const lastYear = currentYear - 1;
  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await axios.get(apiUrl);
      setData(result.data);
      setLoading(false);
    })();
  }, []);

  const sortedLabels = data ? Object.keys(data[currentYear]).sort() : [];

  const currentData = data
    ? {
        labels: sortedLabels,
        datasets: [
          {
            label: currentYear,
            data: sortedLabels.map((week) => data[currentYear][week]),
            borderColor: "#0277bd",
            backgroundColor: "#0277bd"
          },
          {
            label: lastYear,
            data: sortedLabels.map((week) => data[lastYear][week]),
            borderColor: "#2b675c",
            backgroundColor: "#2b675c",
            pointStyle: "triangle"
          }
        ]
      }
    : {};
  return data && <LineChart data={currentData} />;
};

export default withWidgetChildrenLoader(Widget4);
