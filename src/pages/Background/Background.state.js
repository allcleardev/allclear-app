export const exposureObjDefault = () => {
  return {};
};

const states = (function states() {
  return {
    exposureObj: exposureObjDefault(),
    exposures: [],
  };
}());
export default states;
