import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Widget1 from "./widgets/Widget1";
import Widget2 from "./widgets/Widget2";
import Widget3 from "./widgets/Widget3";
import Widget4 from "./widgets/Widget4";
import Widget5 from "./widgets/Widget5";
import Widget6 from "./widgets/Widget6";
import Widget7 from "./widgets/Widget7";
import Widget8 from "./widgets/Widget8";
import Widget9 from "./widgets/Widget9";
import Widget10 from "./widgets/Widget10";
import Widget11 from "./widgets/Widget11";

const ReactGridLayout = WidthProvider(RGL);

const Dashboard1 = () => {
    return (
        <ReactGridLayout
            isDraggable={false}
            layout={[
                { i: "0", x: 0, y: 0, w: 3, h: 20 },
                { i: "1", x: 3, y: 0, w: 3, h: 20 },
                { i: "2", x: 6, y: 0, w: 3, h: 20 },
                { i: "3", x: 9, y: 0, w: 3, h: 20 },
                { i: "4", x: 0, y: 20, w: 3, h: 20 },
                { i: "5", x: 3, y: 20, w: 3, h: 20 },
                { i: "6", x: 6, y: 20, w: 3, h: 20 },
                { i: "7", x: 9, y: 20, w: 3, h: 20 },
                { i: "8", x: 0, y: 40, w: 12, h: 40 },
                { i: "9", x: 0, y: 80, w: 12, h: 40 },
                { i: "10", x: 0, y: 120, w: 12, h: 40 }
            ]}
            cols={12}
            rowHeight={1}
            containerPadding={[0, 0]}
        >
            <WidgetContainer key="0" dashboardIndex={0} widgetIndex={0} childrenWidgets={[{ title: "MPOX confirmed deaths", widget: <Widget1 /> }]}/>
            <WidgetContainer key="1" dashboardIndex={0} widgetIndex={1} childrenWidgets={[{ title: "MPOX notifications", widget: <Widget2 /> }]}/>
            <WidgetContainer key="2" dashboardIndex={0} widgetIndex={2} childrenWidgets={[{ title: "MPOX notifications investigated", widget: <Widget3 /> }]}/>
            <WidgetContainer key="3" dashboardIndex={0} widgetIndex={3} childrenWidgets={[{ title: "MPOX notifications validated", widget: <Widget4 /> }]}/>
            <WidgetContainer key="4" dashboardIndex={0} widgetIndex={4} childrenWidgets={[{ title: "MPOX suspected cases", widget: <Widget5 /> }]}/>
            <WidgetContainer key="5" dashboardIndex={0} widgetIndex={5} childrenWidgets={[{ title: "MPOX confirmed cases", widget: <Widget6 /> }]}/>
            <WidgetContainer key="6" dashboardIndex={0} widgetIndex={6} childrenWidgets={[{ title: "MPOX lab samples collected", widget: <Widget7 /> }]}/>
            <WidgetContainer key="7" dashboardIndex={0} widgetIndex={7} childrenWidgets={[{ title: "MPOX lab samples tested", widget: <Widget8 /> }]}/>
            <WidgetContainer key="8" dashboardIndex={0} widgetIndex={8} childrenWidgets={[{ title: "Cascade (12 week trend)", widget: <Widget9 /> }]}/>
            <WidgetContainer key="9" dashboardIndex={0} widgetIndex={9} childrenWidgets={[{ title: "Epi Curve (12 week trend)", widget: <Widget10 /> }]}/>
            <WidgetContainer key="10" dashboardIndex={0} widgetIndex={10} childrenWidgets={[{ title: "MPOX confirmed cases by sub unit (12 week trend)", widget: <Widget11 /> }]}/>
        </ReactGridLayout>
    )
}

export default Dashboard1;