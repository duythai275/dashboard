import BarChart from "@/components/Widgets/BarChart";

const Widget1_1 = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: "red",
        label: "Dataset 1",
        data: [1, 2, 3, 4, 5, 6, 7]
      },
      {
        backgroundColor: "blue",
        label: "Dataset 2",
        data: [7, 6, 5, 4, 3, 2, 1]
      }
    ]
  };
  return <BarChart data={data} />;
};

export default Widget1_1;
