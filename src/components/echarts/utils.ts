import { Dimensions } from './baseConfig'
export const floorMun = (value: number, num: number = 0) => {
    return Number((value * 100).toFixed(num))
}

export const getPercentVal = (lists: Dimensions[]) => {
    let totalArr = lists[0].data.map((item, index) => {
        let cur = 0
        for(let i = 0; i<lists.length; i++) {
            let curData = lists[i].data
           cur = cur + Number(curData[index])
        }
        return cur
    })
    let len = totalArr.length
    for(let j = 0; j < len; j++) {
        for(let f of lists) {
            let curVal = f.data[j]
            f.data[j] = floorMun((curVal as number) / totalArr[j] / 100,4)
        }
    }
    return lists
}