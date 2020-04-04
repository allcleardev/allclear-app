
export const resultObjDefault = () => {
    return
        {
    }
}

const states = (function states() {
    return {
        resultObj: resultObjDefault(),
        loading: false
    }
})()
export default states;
