import { useState } from "react";
import Loader from "@/components/Loader/Loader";

const withWidgetChildrenLoader = (Component) => {
  const ChildrenWithLoader = (props) => {
    const [loading, setLoading] = useState(false);
    return [loading && <Loader />, <Component setLoading={setLoading} {...props} />];
  };
  return ChildrenWithLoader;
};
export default withWidgetChildrenLoader;
