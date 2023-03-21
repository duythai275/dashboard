import InternalContainer from "@/components/App/InternalContainer";
import ExternalContainer from "@/components/App/ExternalContainer";
import useSelectionStore from "@/state/selection";
import "./App.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const { VITE_MODE } = import.meta.env;

const App = () => {
  const { i18n } = useTranslation();
  const language = useSelectionStore((state) => state.language);
  console.log(VITE_MODE);
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return <div className="App">{VITE_MODE === "internal" ? <InternalContainer /> : <ExternalContainer />}</div>;
};

export default App;
