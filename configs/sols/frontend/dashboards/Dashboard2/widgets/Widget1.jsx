import LineChart from "@/components/Widgets/LineChart";

const Widget1 = () => {
    return <BarChart data={{
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
            label: "2021",
            data: [123,143,112,143,152,123,167,176,114,166,113,135],
            borderColor: "#A8BF23",
            backgroundColor: "#A8BF23"
        },
        {
            label: "2022",
            data: [173,163,102,143,112,123,197,176,114,166,113,135],
            borderColor: "#5790C6",
            backgroundColor: "#5790C6"
        }]
    }} />
}

export default Widget1;