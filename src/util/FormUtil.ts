export default <T>(data: Array<Array<IFormModel>>): T => {
    const obj: T = {} as T
    const map: Map<String, any> = new Map()
    for (let row of data) {
        for (let item of row) {
            map.set(item.key, item.value)
            obj[item.key] = item.value
        }
    }
    return obj
}