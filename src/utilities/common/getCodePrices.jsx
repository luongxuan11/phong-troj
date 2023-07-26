import {getNumber, getNumberAcreage} from "./getnumber"

const getCodePrices = (totals) => {
    let arr = []
    return totals.map(item => {
        let arrMaxMin = getNumber(item?.value)
        if(arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortedArr = arr.sort()
        
        return ({
            ...item,
            min: sortedArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortedArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortedArr.indexOf(arrMaxMin[0]) === 1 ? 999999 : arrMaxMin[1]
        })
    })
}
const getCodeAcreage = (totals) => {
    let arr = []
    return totals.map(item => {
        let arrMaxMin = getNumberAcreage(item?.value)
        if(arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortedArr = arr.sort()
        
        return ({
            ...item,
            min: sortedArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortedArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortedArr.indexOf(arrMaxMin[0]) === 1 ? 999999 : arrMaxMin[1]
        })
    })
}

export const getCodes = (arrMinMax, prices) => {
    const pricesMinMax = getCodePrices(prices)
    return pricesMinMax.filter(item => (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]))
}
export const getCodesAcreage = (arrMinMax, acreage) => {
    const pricesMinMax = getCodeAcreage(acreage)
    return pricesMinMax.filter(item => (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]))
}