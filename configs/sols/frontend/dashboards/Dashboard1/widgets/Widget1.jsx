import { useEffect } from "react";
import LineChart from "@/components/Widgets/LineChart";

const Widget1 = () => {
    return <LineChart data={{
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
            label: "2021",
            data: [123,443,412,543,652,423,567,876,314,966,213,435],
            borderColor: "#A8BF23",
            backgroundColor: "#A8BF23"
        },
        {
            label: "2022",
            data: [173,463,402,443,612,223,597,576,714,266,613,235],
            borderColor: "#5790C6",
            backgroundColor: "#5790C6"
        }]
    }} />
}

export default Widget1;