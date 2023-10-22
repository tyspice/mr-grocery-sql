import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Item, baseUrl as baseURL } from "../models";
import { store } from "../store";
import { logout } from "../features/auth";
import _ from "lodash-es";

class DataService {
  private async _authenticatedRequest(config: AxiosRequestConfig) {
    const { token } = store.getState().auth;

    let res;
    try {
      res = await axios(
        _.merge(config, <AxiosRequestConfig>{
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
      );
    } catch (error: any) {
      if (error?.response?.status === 401) {
        store.dispatch(logout());
      }
    }
    return res;
  }

  private async _get(url: string) {
    return this._authenticatedRequest({
      method: "GET",
      baseURL,
      url,
    });
  }

  public async getShoppingItems(): Promise<AxiosResponse<Item[]> | undefined> {
    return this._get("/items/shopping");
  }
}

const instance = new DataService();
export default () => instance;
