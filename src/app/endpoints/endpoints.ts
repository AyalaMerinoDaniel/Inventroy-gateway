import { environment } from "../../environments/environment.dev";

export enum EndpointsPaths {
  //products
  product = '/product',
  productCreate = '/product/create',
  getProductById= '/product/{id}',
  productUpdate = '/product/update',

  //categories
  categorySelector = '/category/selector'
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



  //categories
  {
    endpoint: EndpointsPaths.categorySelector,
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