/**
 * 调分页接口时，必传当前页和每页尺寸，所以单纯抽取出来形成一个接口
 */
export default interface IPageReq<T = any> {
    /**
     * 当前分页数
     */
    current: number,
    /**
     * 每页存储
     */
    size: number,
}
