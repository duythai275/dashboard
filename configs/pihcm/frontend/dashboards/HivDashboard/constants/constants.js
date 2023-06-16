export const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export const regionLabels = [
  "20 tỉnh miền nam",
  "7 tỉnh PEPFAR",
  "13 tỉnh ngoài PEPFAR",
];

export const customOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 18,
  },
  plugins: {
    tooltip: {
      callbacks: {
        title: (context) => {
          return context[0].label.replaceAll(",", "");
        },
      },
    },
    legend: {
      position: "bottom",
    },

    datalabels: {
      anchor: "end",
      align: "end",
      offset: -5,
      color: "#000",
      borderColor: "#000",
      font: {
        size: 12,
      },
    },
  },
};
