/**
 * @name utils.ts
 * @description 通用工具库
 */

/**
  * 获取并转换查询字符串
  */
export function getSearch(): URLSearchParams {
    let query: string = location.search;
    if (query) {
        // 删除问号
        query = query.slice(1);
        const params = new URLSearchParams(query);
        return params;
    } else {
        return new URLSearchParams();
    }
}