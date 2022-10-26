import { useState } from "react";
import Loader from "@/components/Loader/Loader";

const withWidgetChildrenLoader = (Component) => {
  const ChildrenWithLoader = () => {
    const [loading, setLoading] = useState(false);
    return [loading && <Loader />, <Component setLoading={setLoading} />];
  };
  return ChildrenWithLoader;
};
export default withWidgetChildrenLoader;
