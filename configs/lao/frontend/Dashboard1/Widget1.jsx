import CustomWidget from "@/components/Widgets/Custom";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useEffect, useState } from "react";
import axios from "axios";
const Widget1 = ({ setLoading }) => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const result = await axios.get("/api/test");
      setData(result.data);
    })();
  }, []);

  return (
    <CustomWidget>
      {data &&
        data.indicators.map((indicator) => {
          return indicator.displayName;
        })}
    </CustomWidget>
  );
};
export default withWidgetChildrenLoader(Widget1);
