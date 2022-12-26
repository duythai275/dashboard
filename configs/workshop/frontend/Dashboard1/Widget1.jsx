import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import useMetadataStore from "@/state/metadata";

const Widget1 = () => {
  const [data, setData] = useState(null);
  const ltUnits = useMetadataStore((state) => state.ltUnits);
  const getData = async () => {
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Dataset 1",
          data: [1, 2, 3, 4, 5, 6, 7],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)"
        },
        {
          label: "Dataset 2",
          data: [7, 6, 5, 4, 3, 2, 1],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)"
        }
      ]
    };
  };

  useEffect(() => {
    (async () => {
      const currentData = await axios.get("/api/getD1W1Data");
      setData({
        labels: currentData.data.map((de) => de.ten),
        datasets: [
          {
            label: "Dataset 1",
            data: currentData.data.map((de) => Math.round(Math.random() * 1000)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)"
          }
        ]
      });
    })();
  }, []);

  return data && <LineChart data={data} />;
};
export default withWidgetChildrenLoader(Widget1);
