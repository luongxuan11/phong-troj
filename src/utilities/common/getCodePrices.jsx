import {getNumber, getNumberAcreage} from "./getnumber"

const getCodePrices = (totals, min, max) => {
    return totals?.map(item => {
        let arrMaxMin = getNumber(item?.value)
        return ({
            ...item,
            min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0],
            max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 99999999999 : arrMaxMin[0]
        })
    })
}
const getCodeAcreage = (totals, min, max) => {
    return totals?.map(item => {
        let arrMaxMin = getNumberAcreage(item?.value)
        // console.log(arrMaxMin)
        return ({
            ...item,
            min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0],
            max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 9999999999999 : arrMaxMin[0]
        })
    })
}
//arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0]

export const getCodes = (entry, prices, min, max) => {
    const pricesMinMax = getCodePrices(prices, min, max)
    let resultPriceMinMax = pricesMinMax.filter(item => item.min <= entry && entry < item.max)
    return resultPriceMinMax
}
export const getCodesAcreage = (entry, acreages, min, max) => {
    const acreageMinMax = getCodeAcreage(acreages, min, max)
    return acreageMinMax.filter(item => item.min <= entry && entry < item.max)
}