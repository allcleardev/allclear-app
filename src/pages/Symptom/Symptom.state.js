
export const symptomObjDefault = () => {
    return
    {
    }
}

const states = (function states() {
    return {
        symptomObj: symptomObjDefault(),
        symptoms: [
            { name: 'Fever', isActive: false },
            { name: 'Shorness of Breath', isActive: false },
            { name: 'Dry Cough', isActive: false },
            { name: 'Fatigue', isActive: false },
            { name: 'Runny Nose or Nasal Congestion', isActive: false },
            { name: 'Sore Throat', isActive: false },
            { name: 'Nausea or Vomiting', isActive: false },
            { name: 'Muscle Ache', isActive: false },
            { name: 'Diarrhea', isActive: false },
            { name: 'None', isActive: false }
        ]
    }
})()
export default states;
