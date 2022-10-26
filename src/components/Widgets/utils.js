import { precisionRound } from "d3-format";

const numberPrecision = (d) => {
  if (d === undefined) {
    return (n) => n;
  }
  const m = Math.pow(10, d);
  return (n) => Math.round(n * m) / m;
};

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

const getIntervals = (interval, num) => {
  const size = Math.floor(interval / num);
  const res = [];
  for (let i = 0; i <= interval; i += size) {
    const a = i == 0 ? i : (i += 1);
    const b = i + size > interval ? interval : i + size;
    if (a < interval) {
      res.push([a, b]);
    }
  }
  return res;
};

const getEqualIntervals = (numbers, length) => {
  const sorted = numbers.sort((a, b) => a - b);
  const maxValue = sorted[numbers.length - 1];
  const minValue = sorted[0];
  const bins = [];
  const binSize = (maxValue - minValue) / length;
  const precision = precisionRound(binSize, maxValue);
  const valueFormat = numberPrecision(precision);

  for (let i = 0; i < length; i++) {
    const startValue = minValue + i * binSize;
    const endValue = i < length - 1 ? startValue + binSize : maxValue;

    bins.push({
      min: valueFormat(startValue),
      max: valueFormat(endValue)
    });
  }

  return bins;
};

const getQuantiles = (numbers, length) => {
  const sorted = numbers.sort((a, b) => a - b);
  const minValue = sorted[0];
  const maxValue = sorted[numbers.length - 1];
  const bins = [];
  const binCount = numbers.length / length;
  const precision = precisionRound((maxValue - minValue) / length, maxValue);
  const valueFormat = numberPrecision(precision);

  let binLastValPos = binCount === 0 ? 0 : binCount;

  if (numbers.length > 0) {
    bins[0] = minValue;
    for (let i = 1; i < length; i++) {
      bins[i] = numbers[Math.round(binLastValPos)];
      binLastValPos += binCount;
    }
  }

  // bin can be undefined if few values
  return bins
    .filter((bin) => bin !== undefined)
    .map((value, index) => ({
      min: valueFormat(value),
      max: valueFormat(bins[index + 1] || maxValue)
    }));
};

export { numberWithCommas, getIntervals, getEqualIntervals, getQuantiles };
