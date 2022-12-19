import { useEffect, useState } from "react";
import { pull } from "../../../../utils";

export const usePrepareDataForFilter = () => {
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [ownershipOptions, setOwnershipOptions] = useState(null);
  const [listDataElementOfService, setListDataElementOfService] =
    useState(null);
  const [loading, setLoading] = useState(true);

  const getOptionSetOfCategory = async () => {
    try {
      const result = await pull(
        `/api/optionSets/VVvpXcJJq6s.json?fields=options[*]`
      );
      if (result) {
        setCategoryOptions(result.options);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOptionSetOfOwnership = async () => {
    try {
      const result = await pull(
        `/api/optionSets/agCcJXpPtBM.json?fields=options[*]`
      );
      if (result) {
        setOwnershipOptions(result.options);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getListDataElementOfService = async () => {
    try {
      const result = await pull(
        `/api/29/programs/nOPMZMF91F6.json?filter=programStages.id:eq:es7vEDfcKx8&fields=programStages[id,name,programStageDataElements[dataElement[id,displayFormName]]]`
      );
      if (result) {
        setListDataElementOfService(
          result.programStages[0].programStageDataElements.map(
            (item) => item.dataElement
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const result = await Promise.all([
          getOptionSetOfCategory(),
          getOptionSetOfOwnership(),
          getListDataElementOfService(),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return {
    categoryOptions,
    ownershipOptions,
    listDataElementOfService,
    loading,
  };
};
