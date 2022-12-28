import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { pull } from "../../utils";
import { orgUnitFilter } from "../common/constant/orgUnitFilter";
import OrgUnitSelector from "@/components/OrgUnitSelector/OrgUnitSelector";

import "./index.css";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";
import PeriodSelector from "./PeriodSelector";
import { getListPeriod } from "../common/function/getListPeriod";
import Tab1 from "./tab/Tab1";
import Tab5 from "./tab/Tab5";
import Tab4 from "./tab/Tab4";
import Tab3 from "./tab/Tab3";
import Tab2 from "./tab/Tab2";
const Widget1 = ({ setLoading }) => {
  const { i18n, t } = useTranslation();
  const orgUnits = useMetadataStore((state) => state.hmisOrgUnits);

  const [selectedTab, setSelectedTab] = useState("under1Death");
  const [selectedOu, setSelectedOu] = useState(
    orgUnits.find((item) => item.level === 1)
  );
  const [result, setResult] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const filteredOrgUnits = useMemo(() => {
    if (!orgUnits) return null;
    const result = orgUnits
      .filter(
        (item) =>
          !item.ancestors.find((ancestor) => ancestor.id === "KEGktGHjhYQ")
      )
      .filter((item) => item.id !== "KEGktGHjhYQ")
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
  useEffect(() => {
    if (!selectedOu || !selectedPeriod) return;
    (async () => {
      setLoading(true);
      const oug = orgUnitFilter
        .find((item) => item.level === selectedOu.level)
        .oug.map((item) => `OU_GROUP-${item}`)
        .join(";");
      const period = getListPeriod(selectedPeriod).listPeriod.join(";");
      const year = getListPeriod(selectedPeriod).year;
      const result = await Promise.all([
        await pull(
          `/api/getDashboard3Widget1Tab1Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
        await pull(
          `/api/getDashboard3Widget1Tab2Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
        await pull(
          `/api/getDashboard3Widget1Tab3Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
        await pull(
          `/api/getDashboard3Widget1Tab4Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
        await pull(
          `/api/getDashboard3Widget1Tab5Data?ou=${selectedOu.id}&oug=${oug}&period=${period}&year=${year}`
        ),
      ]);
      const popLiveBirth = result[0].data.popLiveBirth;
      setResult({
        [listTabs[0]]: result[0].data,
        [listTabs[1]]: { ...result[1].data, popLiveBirth },
        [listTabs[2]]: { ...result[2].data, popLiveBirth },
        [listTabs[3]]: { ...result[3].data, popLiveBirth },
        [listTabs[4]]: { ...result[4].data, popLiveBirth },
      });
      setLoading(false);
    })();
  }, [selectedOu, selectedPeriod]);

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

  const listTabComponent = {
    under1Death: (
      <Tab1
        data={result?.under1Death}
        filteredSelectOrgUnit={filteredSelectOrgUnit}
        selectedPeriod={selectedPeriod}
      />
    ),
    under5Death: (
      <Tab2
        data={result?.under5Death}
        filteredSelectOrgUnit={filteredSelectOrgUnit}
        selectedPeriod={selectedPeriod}
      />
    ),
    maternalDeath: (
      <Tab3
        data={result?.maternalDeath}
        filteredSelectOrgUnit={filteredSelectOrgUnit}
        selectedPeriod={selectedPeriod}
      />
    ),
    sbaDelivery: (
      <Tab4
        data={result?.sbaDelivery}
        filteredSelectOrgUnit={filteredSelectOrgUnit}
        selectedPeriod={selectedPeriod}
      />
    ),
    epiPenta3: (
      <Tab5
        data={result?.epiPenta3}
        filteredSelectOrgUnit={filteredSelectOrgUnit}
        selectedPeriod={selectedPeriod}
      />
    ),
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <OrgUnitSelector
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
            value={listTabs.findIndex((tab) => tab === selectedTab)}
            onChange={(e, value) => {
              setSelectedTab(listTabs[value]);
            }}
            // sx={{ backgroundColor: "gray" }}
          >
            {listTabs.map((tab) => {
              return <Tab label={t(tab)} />;
            })}
          </Tabs>
          <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
            {t(`${selectedTab}Title`)}
          </Typography>
          {listTabComponent[selectedTab]}
        </>
      )}
    </Box>
  );
};

export default withWidgetChildrenLoader(Widget1);

const listTabs = [
  "under1Death",
  "under5Death",
  "maternalDeath",
  "sbaDelivery",
  "epiPenta3",
];
