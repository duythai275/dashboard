import React, { useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import L from "leaflet";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import MixedMap from "@/components/Widgets/MixedMap";
import _ from "lodash";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import useDashboardStore from "@/state/dashboard";
import { pull } from "@/utils/fetch";
import { findHeaderIndex } from "../../../utils";
import * as turf from "@turf/turf";
const ReactGridLayout = WidthProvider(Responsive);

const Widget3 = ({ setLoading }) => {
  const { i18n, t } = useTranslation();
  const [data, setData] = useState(null);
  const { orgUnitGeoJson } = useMetadataStore(
    (state) => ({ orgUnitGeoJson: state.orgUnitGeoJson }),
    shallow
  );
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedPeriod, selectedOrgUnit } = additionalState;

  const weeks = useMemo(() => {
    let weeks = [];
    for (let i = 1; i <= 52; i++) {
      weeks.push(`W${i}`);
    }
    return weeks;
  }, []);
  const features = useMemo(() => {
    if (!selectedOrgUnit) return null;
    return orgUnitGeoJson
      ? orgUnitGeoJson.features.filter((feature) => {
          if (selectedOrgUnit.level === 1) {
            return feature.properties.level === "2";
          }
          if (selectedOrgUnit.level === 2) {
            return (
              feature.properties.level === "3" &&
              feature.properties.parent === selectedOrgUnit.id
            );
          }
          return feature.id === selectedOrgUnit.id;
        })
      : [];
  }, [selectedOrgUnit?.id]);
  useEffect(() => {
    if (!selectedPeriod || !selectedOrgUnit) return;
    (async () => {
      try {
        setLoading(true);
        const ouGroup = (() => {
          switch (selectedOrgUnit.level) {
            case 1:
              return "rNQI8VXXCD0";
            case 2:
              return "F02s7E0zJlM";
            default:
              return "";
          }
        })();
        const listPeriod = weeks.map((week) => `${selectedPeriod}${week}`);
        const result = await Promise.all([
          pull(
            `/api/analytics?dimension=dx:laUqDdeLgDx,ou:${selectedOrgUnit?.id}${
              ouGroup && `;OU_GROUP-${ouGroup}`
            }&filter=pe:${listPeriod.join(
              ";"
            )}&displayProperty=NAME&includeNumDen=false&skipMeta=false&skipData=false`
          ),
          pull(
            `/api/analytics?dimension=dx:mVrQMb86ESf,ou:${selectedOrgUnit?.id}${
              ouGroup && `;OU_GROUP-${ouGroup}`
            }&filter=pe:${listPeriod.join(
              ";"
            )}&displayProperty=NAME&includeNumDen=false&skipMeta=false&skipData=false`
          ),
        ]);
        if (result) {
          const ouIndex = findHeaderIndex(result[0].headers, "ou");
          const valueIndex = findHeaderIndex(result[0].headers, "value");
          const caseDataResult = result[0].rows.map((row) => ({
            ou: row[ouIndex],
            value: row[valueIndex] * 1,
          }));
          const deathDataResult = result[1].rows.map((row) => ({
            ou: row[ouIndex],
            value: row[valueIndex] * 1,
          }));
          setData({
            case: caseDataResult,
            death: deathDataResult,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedPeriod, selectedOrgUnit?.id]);

  if (!data || !features) return;
  return (
    data && (
      <MixedMap
        features={features}
        individualMarkers={_.compact(
          data.death.map((item) => {
            const foundOu = features.find((feature) => feature.id === item.ou);
            if (!foundOu) return undefined;

            const centroid = turf.centroid(
              foundOu.geometry.type === "Polygon"
                ? turf.polygon(foundOu.geometry.coordinates)
                : turf.multiPolygon(foundOu.geometry.coordinates)
            );
            return {
              coordinates: centroid.geometry.coordinates.reverse(),
              icon: L.divIcon({
                iconSize: 32,
                className: "dengue-death-case-marker",
                html: `<b>${item.value}</b>`,
              }),
            };
          })
        )}
        data={(() => {
          let result = {};
          data.case.forEach((item) => {
            result = { ...result, [item.ou]: item.value };
          });
          return result;
        })()}
        legend={["#689F38", "#AFB42B", "#FBC02D", "#F57C00", "#AC0800"]}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget3);
