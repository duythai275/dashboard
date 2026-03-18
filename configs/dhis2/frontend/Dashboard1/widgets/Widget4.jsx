import { useState, useEffect } from "react";
import { shallow } from "zustand/shallow";
import Custom from"@/components/Widgets/Custom";
import { Box, Typography } from "@mui/material";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useSelectionStore from "@/state/selection";
import axios from "axios";

const Widget4 = ({ setLoading }) => {
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

            const result = await axios.get("/api/singleWeekData", {
                params: {
                    dx: "H3pKakrWpVP",
                    ou: orgUnit.id,
                    pe: period.id
                }
            });
            setData(result.data.data.rows[0][1]);
            setLoading(false);
        })();
    }, [orgUnit, period]);

    return <Custom>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 30px",
                height: "100%",
            }}
       >
            <Typography
                textAlign="center"
                sx={{ fontWeight: "700", fontSize: "35px" }}
            >{data ? parseInt(data) : `-`}</Typography>
            {/* <Typography textAlign="center">{period.name}</Typography> */}
       </Box>
    </Custom>
}

export default withWidgetChildrenLoader(Widget4);