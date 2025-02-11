# WaterDrop

通用开发脚手架的前端部分

## 1 项目启动

1. node版本：node-v22.11.0

2. 包管理工具pnpm

   ```bash
   #安装pnpm，安装慢可以切换下载源
   npm i pnpm -g
   #查看pnpm当前下载源
   pnpm config get registry
   #切换pnpm下载源
   pnpm config set registry https://registry.npmmirror.com/
   ```

3. 安装依赖并启动

   ```bash
   pnpm install
   pnpm run dev
   ```



## 2 目录结构



## 3 前端开发约定

提前定好一些标准，开发时遵照该标准，可大大降低项目开发与阅读成本

前端发送请求的类以Req结尾，比如UserReq

前端接受后端响应的类以Resp结尾，比如UserResp，由于响应数据的格式大多都是固定的，所以可以抽取出一个`响应通用类`

比如

```json
{
    "success": true, -- 表示此次请求是否成功
  	"message": null, -- 消息
  	"code": 0,       -- 响应状态码
    "time": 114514,  -- 请求耗时
    "data": {}	     -- 数据
}
```

就可以抽取成一个类型

```typescript
export default interface IResp<T = any> {
    /**
     * 此次请求是否成功
     */
    success: boolean,
    /**
     * 此次请求的提示信息
     */
    message: string,
    /**
     * 此次请求的状态码
     */
    code: number,
    /**耗时
     */
    time: number,
    /**
     * 此次请求真正的返回数据
     */
    data: T
}
```

由于success、message、code、time四个字段都是固定，唯一变化的data数据，所以将data字段设置为泛型，其他四个字段设置为具体类型

由于请求的数据格式并没有固定的类型，所以请求时并没有通用的请求类型



分页的请求肯定包含current（当前页）和size（每页大小），所以对于分页请求可以抽取一个通用的`分页请求类`

```typescript
export default interface IPageReq {
    /**
     * 当前分页数
     */
    current: number,
    /**
     * 每页存储
     */
    size: number,
}
```



分页的响应在通用响应格式的基础上，data字段格式也是固定的，所以可以将data字段的格式抽取出来形成一个通用的`分页数据类型`

```typescript
export default interface IPageResp<T = any> {
    /**
     * 当前分页数
     */
    current: number,
    /**
     * 总分页数
     */
    pages: number,
    /**
     * 每页尺寸
     */
    size: number,
    /**
     * 总记录数
     */
    total: number,
    /**
     * 数据区域
     */
    records: Array<T>
}
```

将IResp类型的泛型指定为IPageResp类型，就能得到一个完整的分页响应数据格式