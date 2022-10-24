import Loader from "@/components/Loader/Loader";
import InternalContainer from "@/components/App/InternalContainer";
import ExternalContainer from "@/components/App/ExternalContainer";
import useExternalInitialization from "@/hooks/App/useExternalInitialization";
import useInternalInitialization from "@/hooks/App/useInternalInitialization";
import "./App.css";
const { VITE_MODE } = import.meta.env;

const App = () => {
  const ready = useExternalInitialization();
  return (
    <div className="App">
      {ready ? VITE_MODE === "internal" ? <InternalContainer /> : <ExternalContainer /> : <Loader open={!ready} />}
    </div>
  );
};

export default App;
