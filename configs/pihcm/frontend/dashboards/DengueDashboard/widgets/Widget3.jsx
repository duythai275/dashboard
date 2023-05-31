import React, { useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import L from "leaflet";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import ClusterMap from "@/components/Widgets/ClusterMap";
import caseMarkerImage from "@/config/assets/marker.png";
import MixMap from "@/components/Widgets/MixMap";
import _ from "lodash";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";
import useDashboardStore from "@/state/dashboard";
import { pull } from "@/utils/fetch";
import { findHeaderIndex } from "../../../utils";
import * as turf from "@turf/turf";

const caseMarker = new L.Icon({
  iconUrl: caseMarkerImage,
  iconRetinaUrl: caseMarkerImage,
  iconAnchor: null,
  popupAnchor: [0, -12],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(10, 10),
});

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
  const features = useMemo(() => {
    if (!selectedOrgUnit) return null;
    return orgUnitGeoJson
      ? orgUnitGeoJson.features.filter((feature) =>
          selectedOrgUnit.level === 1
            ? feature.properties.level === "2"
            : feature.properties.level === "3"
        )
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
        const result = await Promise.all([
          pull(
            `/api/analytics?dimension=dx:laUqDdeLgDx,ou:${selectedOrgUnit?.id}${
              ouGroup && `;OU_GROUP-${ouGroup}`
            }&filter=pe:${selectedPeriod}&displayProperty=NAME&includeNumDen=false&skipMeta=false&skipData=false`
          ),
          pull(
            `/api/analytics?dimension=dx:mVrQMb86ESf,ou:${selectedOrgUnit?.id}${
              ouGroup && `;OU_GROUP-${ouGroup}`
            }&filter=pe:${selectedPeriod}&displayProperty=NAME&includeNumDen=false&skipMeta=false&skipData=false`
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
      <MixMap
        features={features}
        markers={data.death
          .map((item) => {
            const foundOu = features.find((feature) => feature.id === item.ou);
            return turf.centroid(turf.polygon(foundOu.geometry.coordinates[0]));
          })
          .map((item) => item.geometry.coordinates.reverse())}
        icon={caseMarker}
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
