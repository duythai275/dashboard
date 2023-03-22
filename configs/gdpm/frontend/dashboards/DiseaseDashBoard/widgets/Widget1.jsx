import MultitypeChart from "@/components/Widgets/MultitypeChart";
import { pull } from "@/utils/fetch";
import { useEffect } from "react";

const Widget1 = ({ code, ou }) => {
  const getData = async () => {
    try {
      const result = await pull(
        `/api/analytics/events/query/PO07dgbJCgr.json?dimension=pe:2023W1;2023W2;2023W3;2023W4;2023W5;2023W6;2023W7;2023W8;2023W9;2023W10;2023W11;2023W12;2023W13;2023W14;2023W15;2023W16;2023W17;2023W18;2023W19;2023W20;2023W21;2023W22;2023W23;2023W24;2023W25;2023W26;2023W27;2023W28;2023W29;2023W30;2023W31;2023W32;2023W33;2023W34;2023W35;2023W36;2023W37;2023W38;2023W39;2023W40;2023W41;2023W42;2023W43;2023W44;2023W45;2023W46;2023W47;2023W48;2023W49;2023W50;2023W51;2023W52;2022W1;2022W2;2022W3;2022W4;2022W5;2022W6;2022W7;2022W8;2022W9;2022W10;2022W11;2022W12;2022W13;2022W14;2022W15;2022W16;2022W17;2022W18;2022W19;2022W20;2022W21;2022W22;2022W23;2022W24;2022W25;2022W26;2022W27;2022W28;2022W29;2022W30;2022W31;2022W32;2022W33;2022W34;2022W35;2022W36;2022W37;2022W38;2022W39;2022W40;2022W41;2022W42;2022W43;2022W44;2022W45;2022W46;2022W47;2022W48;2022W49;2022W50;2022W51;2022W52&dimension=ou:${ou}&dimension=GIdhyQcAihV.Du5ydup8qQf:IN:${code}&stage=GIdhyQcAihV&displayProperty=NAME&totalPages=false&outputType=EVENT&desc=eventdate&outputIdScheme=UID&paging=false`
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return <div>sadasdasdasdasdasd</div>;
};

export default Widget1;
