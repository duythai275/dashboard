import { useEffect, useState } from "react";
import externalApi from "@/api/externalApi";
import useMetadataStore from "@/state/metadata";

const useExternalInitialization = () => {
  const [ready, setReady] = useState(false);
  const setMetadata = useMetadataStore((state) => state.setMetadata);

  useEffect(() => {
    (async () => {
      const result = await externalApi.getOrgUnits();
      const orgUnitGeoJson = await externalApi.getGeoJson();
      setMetadata("orgUnits", result);
      setMetadata("orgUnitGeoJson", orgUnitGeoJson);
      setReady(true);
    })();
  }, []);

  return ready;
};

export default useExternalInitialization;
