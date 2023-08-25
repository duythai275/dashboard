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
import { getISOWeek, getISOWeeksInYear } from "date-fns";

const Widget2 = ({ setLoading }) => {
  const { t } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { orgUnits, dataElementsVariantSarsCov2 } = useMetadataStore(
    (state) => ({
      orgUnits: state.communes,
      dataElementsVariantSarsCov2: state.dataElementsVariantSarsCov2,
    }),
    shallow
  );

  const [data, setData] = useState(null);
  const {
    selectedPeriodForVariantSarsCov2Dashboard,
    selectedOrgUnitForVariantSarsCov2Dashboard,
  } = additionalState;

  const ngsResultOptions = useMemo(() => {
    if (!dataElementsVariantSarsCov2) {
      return [];
    }

    return dataElementsVariantSarsCov2.find((de) => de.id === "SFg4RlJcqoz")
      .optionSet.options;
  }, [dataElementsVariantSarsCov2]);

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
          )}&dimension=w1B3NhIHZTD.SFg4RlJcqoz&stage=w1B3NhIHZTD&displayProperty=NAME&totalPages=false&outputType=EVENT`
      );
      if (result) {
        const eventDateIndex = findHeaderIndex(result.headers, "eventdate");
        const ngsResultIndex = findHeaderIndex(
          result.headers,
          "w1B3NhIHZTD.SFg4RlJcqoz"
        );
        const dataResult = ngsResultOptions.map((option) =>
          listWeek.map((week) => {
            const totalInWeek = result.rows
              .map((row) => {
                if (getISOWeek(new Date(row[eventDateIndex])) === week) {
                  return row;
                }
                return null;
              })
              .filter((item) => item);
            const caseValue = result.rows
              .map((row) => {
                if (
                  getISOWeek(new Date(row[eventDateIndex])) === week &&
                  row[ngsResultIndex] === option.code
                ) {
                  return row;
                }
                return null;
              })
              .filter((item) => item);

            return {
              percent:
                ((caseValue.length / totalInWeek.length) * 100).toFixed(1) *
                  1 || 0,
              case: caseValue.length,
            };
          })
        );
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
    if (!ngsResultOptions || !listWeek) return [];

    return ngsResultOptions
      .reduce((prev, curr) => {
        if (prev.length === 0) {
          let array = [];

          listWeek.forEach((week) => {
            array = [...array, _.random(1, 100, true).toFixed(1)];
          });
          return [...prev, array];
        }
        if (prev.length === ngsResultOptions.length - 1) {
          let array = [];

          listWeek.forEach((week, index) => {
            array = [
              ...array,
              (
                100 - prev.reduce((prev1, curr1) => prev1 + curr1[index] * 1, 0)
              ).toFixed(1) * 1 || 0,
            ];
          });
          return [...prev, array];
        }
        let array = [];

        listWeek.forEach((week, index) => {
          array = [
            ...array,
            _.random(
              1,
              100 - prev.reduce((prev1, curr1) => prev1 + curr1[index] * 1, 0),
              true
            ).toFixed(1) * 1 || 0,
          ];
        });
        return [...prev, array];
      }, [])
      .map((item) => item.map((item1) => item1 * 1));
  }, [ngsResultOptions, listWeek]);
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
        min: 0,
        max: 100,
        stacked: true,
        ticks: {
          callback: (value, index, ticks) => {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <BarChart
      customOptions={options}
      data={{
        labels: listWeek.map((week, indexWeek) => {
          const currentYear = week.slice(0, 4);
          const currentWeek = week.slice(5);
          return `${t("week")}  ${currentWeek}/${currentYear}`;
        }),
        // labels: listWeek.map((week, indexWeek) => {
        //     const currentYear = week.slice(0, 4);
        //     const currentWeek = week.slice(5);
        //     return `${t(
        //       "week"
        //     )}  ${currentWeek}/${currentYear} (n=${ngsResultOptions.reduce(
        //       (prev, curr, index) => prev + (data[index][indexWeek].case || 0),
        //       0
        //     )})`;
        //   }),
        datasets: ngsResultOptions.map((option, index) => ({
          type: "bar",
          label: option.displayName,
          backgroundColor: colors[index]?.color,
          borderColor: colors[index]?.color,
          // data: data[index].map(item => item.percent),
          data: dataDummy[index],
          maxBarThickness: 120,
        })),
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget2);
const colors = [
  {
    id: "",
    color: "#FD0205",
  },
  {
    id: "",
    color: "#FDB23F",
  },
  {
    id: "",
    color: "#FDFE37",
  },
  {
    id: "",
    color: "#09CAEE",
  },
  {
    id: "",
    color: "#6CAE46",
  },
  {
    id: "",
    color: "#702CA3",
  },
  {
    id: "",
    color: "#223ADA",
  },
  {
    id: "",
    color: "#C8480D",
  },
  {
    id: "",
    color: "#609A65",
  },
  {
    id: "",
    color: "#FE8D58",
  },
  {
    id: "",
    color: "#079480",
  },
  {
    id: "",
    color: "#AC800D",
  },
  {
    id: "",
    color: "#CF68C4",
  },
  {
    id: "",
    color: "#C28E8E",
  },
  {
    id: "",
    color: "#CFD991",
  },
  {
    id: "",
    color: "#CF7B37",
  },
  {
    id: "",
    color: "#75E7A3",
  },
  {
    id: "",
    color: "#062564",
  },
  {
    id: "",
    color: "#33531D",
  },
  {
    id: "",
    color: "#222A01",
  },
];

const listOption = [
  "Delta",
  "BA.1",
  "BA.2",
  "BA.2.12.1",
  "BA.2.75",
  "BA.4",
  "BA.5",
  "CH.1.1",
  "FL.1",
  "FU.2",
  "XBB",
  "XBB.1",
  "XBB.1.16",
  "XBB.1.16.1",
  "XBB.1.16.2",
  "XBB.1.5",
  "XBB.1.9",
  "XBB.1.9.1",
  "XBB.1.9.2",
  "XBB.2.3",
];
