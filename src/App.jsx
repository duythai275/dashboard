import Loader from "@/common/Loader/Loader";
import ControlBar from "@/components/ControlBar/ControlBar";
import useExternalInitialization from "@/hooks/App/useExternalInitialization";
import useInternalInitialization from "@/hooks/App/useInternalInitialization";
import "./App.css";
const { VITE_MODE } = import.meta.env;

const InternalContainer = () => {
  return <div></div>;
};

const ExternalContainer = () => {
  return <div className="external-container">WORKKKKKKKKKKKKKKKKKKKKK</div>;
};

const App = () => {
  const ready = useExternalInitialization();
  return (
    <div className="App">
      {ready ? VITE_MODE === "internal" ? <InternalContainer /> : <ExternalContainer /> : <Loader open={!ready} />}
    </div>
  );
};

export default App;
