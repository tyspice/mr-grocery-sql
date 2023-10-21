import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Item, baseUrl as baseURL } from "../models";
import { store } from "../store";
import _ from "lodash-es";

class DataService {
  private async _authenticatedRequest(config: AxiosRequestConfig) {
    const { token } = store.getState().auth;
    return axios(
      _.merge(config, <AxiosRequestConfig>{
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
    );
  }

  private async _get(url: string) {
    return this._authenticatedRequest({
      method: "GET",
      baseURL,
      url,
    });
  }

  public async getShoppingItems(): Promise<AxiosResponse<Item[]>> {
    return this._get("/items/shopping");
  }
}

const instance = new DataService();
export default () => instance;
