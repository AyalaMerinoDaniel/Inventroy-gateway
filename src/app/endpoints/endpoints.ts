import { environment } from "../../environments/environment.dev";

export enum EndpointsPaths {
  product = '/product'
}

export const endpointList: EndpointModel[] = [
  {
    endpoint: EndpointsPaths.product,
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