import { useState, useEffect } from "react";
import { shallow } from "zustand/shallow";
import DataGrid from "@/components/Widgets/DataGrid";
import { Box, Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
import { getLast12Weeks, datasetColors } from "../../utils";
import axios from "axios";

const Widget11 = ({ setLoading }) => {
    const [data, setData] = useState(null);
    const { orgUnit, period } = useSelectionStore(
        (state) => ({
            orgUnit: state.orgUnit,
            period: state.period
        }), 
        shallow 
    );
    const { orgUnits } = useMetadataStore(
        (state) => ({
            orgUnits: state.orgUnits,
        }), 
        shallow 
    );

    useEffect(() => {
        (async () => {
            setLoading(true);

            const result = await axios.get("/api/last12WeeksDataByOus", {
                params: {
                    dx: "bsxH7MtmJQq",
                    ou: orgUnits
                        .filter( o => o.parent && o.parent.id === orgUnit.id )
                        .map(({ id }) => id).join(";"),
                    pe: getLast12Weeks(period.id).join(";")
                }
            });
            setData({
                columns: [
                    {
                        key: "ou",
                        label: "Organisation Unit",
                    },
                    ...getLast12Weeks(
                        `${period.year}W${String(period.week).padStart(2, "0")}`,
                    ).map((weekStr) => ({
                        key: weekStr,
                        label: `Week ${weekStr.slice(5)} - ${weekStr.slice(0, 4)}`,
                    })),
                ],
                rows: orgUnits
                        .filter( o => o.parent && o.parent.id === orgUnit.id )
                        .map((ou) => {
                            const row = { ou: ou.name };
                            getLast12Weeks(
                                `${period.year}W${String(period.week).padStart(2, "0")}`,
                            ).forEach((weekStr) => {
                                const val = result.data.data?.rows?.find(
                                    (r) => r[0] === ou.id && r[1] === weekStr,
                                )?.[2];
                                row[weekStr] = val ? parseInt(val) : 0;
                            });
                            return row;
                        })
            });
            setLoading(false);
        })();
    }, [orgUnit, period]);

    // return data && <DataGrid 
    //     columns={data.columns} 
    //     rows={data.rows}
    // />
    return data && <TableContainer 
        component={Paper} 
        variant="outlined"
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {data.columns.map((c) => (
              <TableCell key={c.key}>{c.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((r, idx) => (
            <TableRow key={idx}>
              {data.columns.map((c) => (
                <TableCell key={c.key}>{r[c.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
}

export default withWidgetChildrenLoader(Widget11);