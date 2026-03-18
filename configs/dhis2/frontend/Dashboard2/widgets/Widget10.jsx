import { useState, useEffect } from "react";
import { shallow } from "zustand/shallow";
import BarChart from "@/components/Widgets/BarChart";
import { Box, Typography } from "@mui/material";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useSelectionStore from "@/state/selection";
import { getLast12Weeks, datasetColors } from "../../utils";
import axios from "axios";

const Widget10 = ({ setLoading }) => {
    const [data, setData] = useState(null);
    const { orgUnit, period } = useSelectionStore(
        (state) => ({
            orgUnit: state.orgUnit,
            period: state.period
        }), 
        shallow 
    );

    useEffect(() => {
        (async () => {
            setLoading(true);

            const result = await axios.get("/api/last12WeeksData", {
                params: {
                    dx: ["NCATB7tMvXz", "bsxH7MtmJQq", "cxNyeFCNDeM"].join(";"),
                    ou: orgUnit.id,
                    pe: getLast12Weeks(period.id).join(";")
                }
            });
            setData({
                labels: getLast12Weeks(period.id),
                datasets: ["NCATB7tMvXz", "bsxH7MtmJQq", "cxNyeFCNDeM"].map((piId, index) => ({
                    label: result.data.data.metaData.items[piId].name,
                    data: getLast12Weeks(period.id).map((pe) => {
                        const found = result.data.data.rows.find((row) => row[0] === piId && row[1] === pe);
                        return found ? parseInt(found[2]) : 0;
                    }),
                    backgroundColor: datasetColors[index],
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                }))
            });
            setLoading(false);
        })();
    }, [orgUnit, period]);

    return data && <BarChart 
        data={data}
        customOptions={{
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 18,
            },
            plugins: { 
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            return context[0].label.replaceAll(",", "");
                        },
                    },
                },
                legend: { display: true, position: "bottom" },
                datalabels: {
                    offset: -5,
                    color: "#fff",
                    borderColor: "#000",
                    textStrokeColor: "black", // <-- added this
                    textStrokeWidth: 3, // <-- added this,
                    font: {
                        size: 12,
                    },
                }
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true },
            },
        }}
    />
}

export default withWidgetChildrenLoader(Widget10);