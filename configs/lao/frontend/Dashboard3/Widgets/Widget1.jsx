import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import OrgUnitSelector from "@/components/OrgUnitSelector/OrgUnitSelector";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";

import PeriodSelector from "./PeriodSelector";

import { LIST_TABS } from "../common/constant/listTab";
import { orgUnitFilter } from "../common/constant/orgUnitFilter";
import { getListPeriod } from "../common/function/getListPeriod";

import "./index.css";
import TabDetail from "./Tab";
import { LIST_HEADER } from "../common/constant/listHeader";
import useData from "./useData";

const Z_ORG_UNIT_ID = "KEGktGHjhYQ";

const Widget1 = ({ setLoading }) => {
  const { i18n, t } = useTranslation();
  const orgUnits = useMetadataStore((state) => state.hmisOrgUnits);

  const [selectedTab, setSelectedTab] = useState("under1Death");
  const [selectedOu, setSelectedOu] = useState(
    orgUnits.find((item) => item.level === 1)
  );

  const [selectedPeriod, setSelectedPeriod] = useState({
    start: { month: new Date().getMonth() + 1, year: new Date().getFullYear() },
    end: { month: new Date().getMonth() + 1, year: new Date().getFullYear() },
  });

  const result = useData(selectedOu, selectedPeriod, setLoading);
  const filteredOrgUnits = useMemo(() => {
    if (!orgUnits) return null;
    const result = orgUnits
      .filter(
        (item) =>
          !item.ancestors.find((ancestor) => ancestor.id === Z_ORG_UNIT_ID)
      )
      .filter((item) => item.id !== Z_ORG_UNIT_ID)
      .filter((item) => item.level < 5);
    const result1 = result.filter((item) => {
      if (item.level > 3) return null;
      const filter = orgUnitFilter.find(
        (filterItem) => filterItem.level === item.level
      );
      const children = result.filter(
        (resultItem) => resultItem.parent?.id === item.id
      );
      const isInOug = children.find((child) =>
        child.oug.find((ougItem) => filter.oug.includes(ougItem.id) && ougItem)
      );
      if (isInOug) {
        return item;
      }
    });
    return result1.filter((item) => item);
  }, [orgUnits]);

  const filteredSelectOrgUnit = useMemo(() => {
    if (!selectedOu) return null;

    const result = orgUnits.filter((item) => item.parent?.id === selectedOu.id);
    if (selectedOu.level === 3) return result;
    const filter = orgUnitFilter.find(
      (item) => item.level === selectedOu.level
    );
    if (!filter) return null;

    const result1 = result.map((item) => {
      let isInOug = false;
      item.oug.forEach((ougItem) => {
        if (filter.oug.includes(ougItem.id)) {
          isInOug = true;
          return;
        }
      });
      if (isInOug) return item;
      return null;
    });

    return result1.filter((item) => item).length > 0
      ? result1.filter((item) => item)
      : null;
  }, [selectedOu]);

  const currentNameProperty = i18n.language === "en" ? "nameEn" : "nameLo";

  const converted = useMemo(() => {
    if (!filteredOrgUnits) return [];
    return filteredOrgUnits.map((ou) => {
      return {
        id: ou.id,
        parent: ou.parent,
        level: ou.level,
        displayName: ou[currentNameProperty],
      };
    });
  }, [filteredOrgUnits]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
          borderBottom: "1px solid #bbbbbb",
          paddingBottom: "20px",
        }}
      >
        <OrgUnitSelector
          initialOrgUnit={converted.find((item) => item.level === 1)}
          orgUnits={converted}
          accept={(ou) => {
            setSelectedOu(ou);
          }}
        />
        <PeriodSelector
          changePeriod={(period) => {
            setSelectedPeriod(period);
          }}
        />
      </Box>
      {filteredSelectOrgUnit && selectedPeriod && (
        <>
          <Tabs
            value={LIST_TABS.findIndex((tab) => tab === selectedTab)}
            onChange={(e, value) => {
              setSelectedTab(LIST_TABS[value]);
            }}
          >
            {LIST_TABS.map((tab) => {
              return <Tab label={t(tab)} />;
            })}
          </Tabs>
          <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
            {t(`${selectedTab}Title`)}
          </Typography>
          {getListPeriod(selectedPeriod).valid ? (
            <TabDetail
              data={result?.[selectedTab]}
              filteredSelectOrgUnit={filteredSelectOrgUnit}
              selectedPeriod={selectedPeriod}
              listHeader={LIST_HEADER[selectedTab]}
              tab={selectedTab}
            />
          ) : (
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "22px",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {t(getListPeriod(selectedPeriod).error)}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default withWidgetChildrenLoader(Widget1);
