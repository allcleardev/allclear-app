
export const conditionObjDefault = () => {
    return
    {

    }
}

const states = (function states() {
    return {
        conditionObj: conditionObjDefault(),
        conditions: [
            { name: 'Weakend Immune System', isActive: false },
            { name: 'Cordiovascular or Respiratory Disease', isActive: false },
            { name: 'Kidney Failur or Cirrhosis', isActive: false },
            { name: 'Diabetes', isActive: false },
            { name: 'Pregnancy', isActive: false },
            { name: 'None', isActive: false }
        ]
    }
})()
export default states;
