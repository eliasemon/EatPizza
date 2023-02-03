// const dataModel = {
//     id: "openingAndClosingData",
//     name: "ResturentOpeningHr",
//     automaticMode: true,
//     openingHR: 7,
//     closingHR: 20,
//     manualModeResturentClosed: false,
//     notice: "",
//     serviceTimeZone: "GMT+0600",
//   };
const opened = { status : true , message : "Resturent is Opened Now" };
const closed = { status : false , message : "Resturent is Closed Now" };

const autoMaticModeHandle = (openingHR , closingHR) => {
    const time = new Date()
    const hr = time.getHours()
    const ms = time.getMinutes()
    const now = Number(`${hr}.${ms}`)
    if(closingHR < openingHR){
        if(now > openingHR){
            return opened
        }
        if(now > closingHR){
            return closed
        }
        return opened
    }

    if(now > openingHR && now < closingHR){
        return opened
    }
    return closed
}


export const findTheResturentStatus = (dataModel) => {
    const {automaticMode , openingHR , closingHR , manualModeResturentClosed} = dataModel;
    if(manualModeResturentClosed){
        return closed
    }
    if(automaticMode) {
        return autoMaticModeHandle(openingHR , closingHR)
    }
    return opened

}