import { notification } from "antd";
import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const BAD_REQ_CODE = 911;

export class Request {
  instance: AxiosInstance;
  baseConfig: AxiosRequestConfig = {
    baseURL: "/",
    timeout: 30000,
  };

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    // 请求发送前
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // 代理标识
      // const isHttp = config.url?.includes("http");
      // if (import.meta.env.MODE === "development" && !isHttp) {
      //   config.url = "/proxy" + config.url;
      // }

      return config;
    });

    // 请求返回后
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: AxiosError) => {
        notification.error({ message: `请求异常 ===> ${err.message}` });
        throw Error(err.message);
      }
    );
  }

  send<T>(url: string, method = "get", data?: any, config?: AxiosRequestConfig): Promise<T> {
    const axiosConfig = { ...config };
    axiosConfig.url = url;
    axiosConfig.method = method;

    if (method.toLocaleLowerCase() === "get") {
      axiosConfig.params = data;
    } else {
      axiosConfig.data = data;
    }

    return this.instance.request(axiosConfig);
  }
}

export default new Request({});
