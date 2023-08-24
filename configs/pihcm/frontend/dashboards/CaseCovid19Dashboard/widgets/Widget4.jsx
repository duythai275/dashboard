import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import _ from "lodash";
import { memo } from "react";
import { shallow } from "zustand/shallow";

const Widget4 = ({ setLoading }) => {
  const southernRegion = useMetadataStore(
    (state) => state.orgUnitsHfmd,
    shallow
  );

  const barData = {
    labels: southernRegion.map((ou) => ou.displayName),
    datasets: [
      {
        type: "bar",
        label: "< 15",
        backgroundColor: "#50B432",
        // data: data.map(item => item.case),
        data: southernRegion.map((ou) => _.random(100)),
      },
      {
        type: "bar",
        label: "> 15",
        backgroundColor: "#058DC7",
        // data: data.map(item => item.case),
        data: southernRegion.map((ou) => _.random(100)),
      },
    ],
  };

  return <BarChart data={barData} />;
};

export default withWidgetChildrenLoader(memo(Widget4));
