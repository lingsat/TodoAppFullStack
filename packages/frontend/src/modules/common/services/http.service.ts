import axios, { AxiosStatic } from 'axios';
import { APP_KEYS } from '../consts';
import { ITodoBody } from '../../todo/types/todoBody.type';
import { IUserBody } from '../../auth/types/userBody.type';

interface IHttpService {
  baseUrl: string | undefined;
  fetchingService: AxiosStatic;
  apiVersion: string;
}

export class HttpService implements IHttpService {
  constructor(
    baseUrl = process.env.REACT_APP_BASE_URL,
    fetchingService = axios,
    apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  baseUrl: string | undefined;

  fetchingService: AxiosStatic;

  apiVersion: string;

  private getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      Authorization: localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN)
    };
  }

  private extractUrlAndDataFromConfig({
    data,
    url,
    ...configWithoutDataAndUrl
  }: {
    data?: IUserBody | ITodoBody;
    url: string;
  }) {
    return configWithoutDataAndUrl;
  }

  async get(config: { url: string; headers?: object }, withAuth = false) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    const response = await this.fetchingService.get(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async post(
    config: { data: IUserBody | ITodoBody; url: string; headers?: object },
    withAuth = false
  ) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    const response = await this.fetchingService.post(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async put(
    config: {
      data: IUserBody | ITodoBody;
      url: string;
      headers?: object;
    },
    withAuth = false
  ) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    const response = await this.fetchingService.put(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }

  async delete(config: { url: string; headers?: object }, withAuth = false) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    const response = await this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return response;
  }
}
