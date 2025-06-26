import { environment } from "../../environments/environment.dev";

export enum EndpointsPaths {
  //products
  product = '/product',
  productCreate = '/product/create',
  getProductById= '/product/{id}',
  productUpdate = '/product/update',
  productDeleteId = '/product/delete/{id}',

  //categories
  category = '/category',
  categorySelector = '/category/selector',
  categoryCreate = '/category/create',
  categoryUpdate = '/category/update',
  getCategoryById = '/category/{id}',
  categoryDeleteId = '/category/delete/{id}',

  //auth
  authRefresh = '/auth/refresh',
  authLogin = '/auth/login',

  //users
  usersAll = '/users/all',
  usersCreate = '/users/create',
  getUserById = '/users/{id}',
  usersUpdate = '/users/update',
  usersdisableId = '/users/disable/{id}',
  usersEnableId = '/users/enable/{id}',
  usersPasswordChange = '/users/password-change'
}

export const endpointList: EndpointModel[] = [
  //products
  {
    endpoint: EndpointsPaths.product,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.productCreate,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.getProductById,
    environment: environment.apiUrl,
    variable: ['{id}'],
  },
  {
    endpoint: EndpointsPaths.productUpdate,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.productDeleteId,
    environment: environment.apiUrl,
    variable: ['{id}'],
  },


  //categories
  {
    endpoint: EndpointsPaths.category,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.categorySelector,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.categoryCreate,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.categoryUpdate,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.getCategoryById,
    environment: environment.apiUrl,
    variable: ['{id}'],
  },
  {
    endpoint: EndpointsPaths.categoryDeleteId,
    environment: environment.apiUrl,
    variable: ['{id}'],
  },

  //Auth
  {
    endpoint: EndpointsPaths.authRefresh,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.authLogin,
    environment: environment.apiUrl,
    variable: [],
  },

  //users
  {
    endpoint: EndpointsPaths.usersAll,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.usersCreate,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.getUserById,
    environment: environment.apiUrl,
    variable: ['{id}'],
  },
  {
    endpoint: EndpointsPaths.usersUpdate,
    environment: environment.apiUrl,
    variable: [],
  },
  {
    endpoint: EndpointsPaths.usersdisableId,
    environment: environment.apiUrl,
    variable: ['{id}'],
  },

  {
    endpoint: EndpointsPaths.usersEnableId,
    environment: environment.apiUrl,
    variable: ['{id}'],
  },
  {
    endpoint: EndpointsPaths.usersPasswordChange,
    environment: environment.apiUrl,
    variable: [],
  },

  
  
];

export class EndpointModel {
  constructor(
    public endpoint: string,
    public environment: string,
    public variable: string[]
  ) { }
}

export function getFullEndpoint(
  endpoint: EndpointsPaths,
  values: string[] = []
) {
  const endpointTemp = endpointList.find((it) => it.endpoint == endpoint);
  var endpointFinal = endpointTemp!.environment + endpointTemp!.endpoint;
  for (let index = 0; index < values.length; index++)
    endpointFinal = endpointFinal.replace(
      endpointTemp!.variable[index],
      values[index]
    );
  return endpointFinal;
}