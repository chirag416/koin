const calculateStandardDeviation = (values) => {
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  };
  
  module.exports = { calculateStandardDeviation };
  