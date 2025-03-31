import request from "&src/utils/request";

export const companyService = {
  python: (data: { platform: string; target_ids: string[] }) => {
    return request.send<BlobPart>("http://127.0.0.1:8000/start-crawler", "post", data, {
      timeout: 0, // 设置为永不超时
      responseType: "blob", // 设置响应类型为blob以处理文件下载
    });
  },
};
