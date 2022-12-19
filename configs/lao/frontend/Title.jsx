import CustomWidget from "@/components/Widgets/Custom";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { t } from "i18next";

const Title = () => {
  return (
    <CustomWidget>
      <div style={{ width: "100%", textAlign: "center" }}>{t("title")}</div>
    </CustomWidget>
  );
};
export default withWidgetChildrenLoader(Title);
