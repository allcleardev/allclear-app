
export const symptomObjDefault = () => {
    return {}
};

const states = (function states() {
    return {
        symptomObj: symptomObjDefault(),
        symptoms: [
            { name: 'Fever', isActive: false },
            { name: 'Shortness of Breath', isActive: true },
            { name: 'Dry Cough', isActive: false },
            { name: 'Fatigue', isActive: false },
            { name: 'Runny Nose or Nasal Condition', isActive: true },
            { name: 'Sore Throat', isActive: true },
            { name: 'Nausea or Vomiting', isActive: false },
            { name: 'Muscle Ache', isActive: false },
            { name: 'Diarrhea', isActive: false },
            { name: 'None', isActive: false }
        ]
    }
})();
export default states;
