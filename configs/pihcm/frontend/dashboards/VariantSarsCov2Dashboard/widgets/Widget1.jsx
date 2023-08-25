import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import { findHeaderIndex } from "@/config/utils";
import _ from "lodash";
import useMetadataStore from "@/state/metadata";
import BarChart from "@/components/Widgets/BarChart";
import { getISOWeek, getISOWeekYear, getISOWeeksInYear } from "date-fns";

const Widget1 = ({ setLoading }) => {
  const { t } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { orgUnits } = useMetadataStore(
    (state) => ({
      orgUnits: state.communes,
    }),
    shallow
  );

  const [data, setData] = useState(null);
  const {
    selectedPeriodForVariantSarsCov2Dashboard,
    selectedOrgUnitForVariantSarsCov2Dashboard,
  } = additionalState;

  const listWeek = useMemo(() => {
    if (!selectedPeriodForVariantSarsCov2Dashboard) return null;
    const { start, end } = selectedPeriodForVariantSarsCov2Dashboard;
    let year = start.year;
    let week = start.week;
    let result = [];
    while (true) {
      if (year === end.year && week > end.week) {
        break;
      }
      result.push(`${year}W${week}`);
      week++;
      if (week > getISOWeeksInYear(new Date([year]))) {
        week = 1;
        year++;
      }
    }
    return result;
  }, [selectedPeriodForVariantSarsCov2Dashboard]);
  const listOrgUnit = useMemo(() => {
    if (!selectedOrgUnitForVariantSarsCov2Dashboard || !orgUnits) return null;
    return selectedOrgUnitForVariantSarsCov2Dashboard.level === 2
      ? [selectedOrgUnitForVariantSarsCov2Dashboard]
      : orgUnits.filter(
          (ou) =>
            ou.level === 2 &&
            ou.parent.id === selectedOrgUnitForVariantSarsCov2Dashboard.id
        );
  }, [selectedOrgUnitForVariantSarsCov2Dashboard, orgUnits]);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await pull(
        `/api/analytics/events/query/E1Vl6am7tTX.json?dimension=pe:${listWeek.join(
          ";"
        )}&dimension=ou:${listOrgUnit
          .map((ou) => ou.id)
          .join(
            ";"
          )}&dimension=w1B3NhIHZTD.cRgm01toKUu&stage=w1B3NhIHZTD&displayProperty=NAME&totalPages=false&outputType=EVENT`
      );
      if (result) {
        const eventDateIndex = findHeaderIndex(result.headers, "eventdate");
        const ouIndex = findHeaderIndex(result.headers, "ou");
        const numberCaseIndex = findHeaderIndex(
          result.headers,
          "w1B3NhIHZTD.cRgm01toKUu"
        );
        let dataResult = listOrgUnit.reduce(
          (prev, curr) => (prev = { ...prev, curr: {} }),
          {}
        );
        result.rows.forEach((row) => {
          const currentWeek = getISOWeek(new Date(row[eventDateIndex]), {
            weekStartsOn: 1,
          });
          const currentYear = getISOWeekYear(new Date(row[eventDateIndex]), {
            weekStartsOn: 1,
          });
          if (dataResult[row[ouIndex]][`${currentYear}W${currentWeek}`]) {
            dataResult[row[ouIndex]][`${currentYear}W${currentWeek}`] =
              dataResult[row[ouIndex]][`${currentYear}W${currentWeek}`] +
              Number(row[numberCaseIndex]);
          } else {
            dataResult[row[ouIndex]][`${currentYear}W${currentWeek}`] = Number(
              row[numberCaseIndex]
            );
          }
        });
        setData(dataResult);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!listWeek || !listOrgUnit) {
      return;
    }
    getData();
  }, [listOrgUnit, listWeek]);
  const dataDummy = useMemo(() => {
    if (!orgUnits || !listWeek) return [];
    return orgUnits.map((ou) => {
      return listWeek.map((week) => {
        return _.random(1, 100);
      });
    });
  }, [orgUnits, listWeek]);
  if (!data) return null;
  const options = {
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
      legend: {
        position: "bottom",
      },
      datalabels: {
        anchor: "end",
        align: "end",
        offset: -5,
        color: "#fff",
        borderColor: "#000",
        textStrokeColor: "black", // <-- added this
        textStrokeWidth: 3, // <-- added this,
        font: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <BarChart
      customOptions={options}
      data={{
        labels: listWeek.map((week) => {
          const currentYear = week.slice(0, 4);
          const currentWeek = week.slice(5);
          return `${t("week")}  ${currentWeek}/${currentYear}`;
        }),
        datasets: listOrgUnit.map((ou, index) => ({
          type: "bar",
          // label: `${ou.displayName} (${Object.keys(dataResult[ou.id]).reduce((prev,curr) => prev + dataResult[ou.id][curr],0)})`,
          label: `${ou.displayName} (${dataDummy[index].reduce(
            (prev, curr) => prev + curr,
            0
          )})`,
          backgroundColor: colors.find((color) => color.id === ou.id).color,
          borderColor: colors.find((color) => color.id === ou.id).color,
          // data: listWeek.map(week => dataResult[ou.id][week] || 0),
          data: dataDummy[index],
          maxBarThickness: 120,
        })),
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget1);
const colors = [
  {
    id: "LMQPg6RjAPD",
    color: "#FD0205",
  },
  {
    id: "mAaXd4pekeX",
    color: "#FDB23F",
  },
  {
    id: "FgWQNkngCGT",
    color: "#FDFE37",
  },
  {
    id: "fksr6TpHXIR",
    color: "#09CAEE",
  },
  {
    id: "Stvy8tjuGQI",
    color: "#6CAE46",
  },
  {
    id: "MqY9Ba4f9gv",
    color: "#702CA3",
  },
  {
    id: "MJry3jKDcTX",
    color: "#223ADA",
  },
  {
    id: "zm6dMtKxhjw",
    color: "#C8480D",
  },
  {
    id: "u7KgJTphzX3",
    color: "#609A65",
  },
  {
    id: "tPtWRIVag27",
    color: "#FE8D58",
  },
  {
    id: "ypSH8Fjp3SM",
    color: "#079480",
  },
  {
    id: "qqllqxACBWH",
    color: "#AC800D",
  },
  {
    id: "abRKE9Mo4Ja",
    color: "#CF68C4",
  },
  {
    id: "GW4vqzIxhGp",
    color: "#C28E8E",
  },
  {
    id: "VoUGvlbVR2O",
    color: "#CFD991",
  },
  {
    id: "qIs2Lx8AdVH",
    color: "#CF7B37",
  },
  {
    id: "c12kRt4bf0w",
    color: "#75E7A3",
  },
  {
    id: "T9Jzo13fsNL",
    color: "#062564",
  },
  {
    id: "C59lnG4RyAo",
    color: "#33531D",
  },
  {
    id: "Dfj4EbGbpmM",
    color: "#222A01",
  },
];
