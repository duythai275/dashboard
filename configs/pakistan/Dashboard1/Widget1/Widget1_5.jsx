import DataGrid from "@/components/Widgets/DataGrid";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

const Widget1_5 = ({ setLoading }) => {
  return <DataGrid columns={[]} rows={[]} />;
};

export default withWidgetChildrenLoader(Widget1_5);
