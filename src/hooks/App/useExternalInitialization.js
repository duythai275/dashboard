import externalApi from "@/api/externalApi";
import useMetadataStore from "@/state/metadata";
import { useEffect, useState } from "react";

const useExternalInitialization = () => {
  const [ready, setReady] = useState(false);
  const setMetadata = useMetadataStore((state) => state.setMetadata);

  useEffect(() => {
    (async () => {
      const result = await externalApi.getOrgUnits();
      setMetadata("orgUnits", result);
      setReady(true);
    })();
  }, []);

  return ready;
};

export default useExternalInitialization;
