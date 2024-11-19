/**
 * 进入系统时根据时间进行不同的问候
 */
export default (): string => {
    let hours: number = new Date().getHours()
    let message: string = ""
    if (hours <= 4) {
        message = '夜深了，注意休息'
    } else if (hours <= 7) {
        message = '清晨的美好时光'
    } else if (hours <= 9) {
        message = '早上好'
    } else if (hours <= 12) {
        message = '上午好'
    } else if (hours <= 14) {
        message = '中午好'
    } else if (hours <= 18) {
        message = '下午好'
    } else if (hours <= 22) {
        message = '晚上好'
    }
    return message
}