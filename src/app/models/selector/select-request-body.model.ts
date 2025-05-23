export class SelectRequestBodyModel {
  constructor(
    public limit: number,
    public offset: number,
    public value: string
  ) {}
}

export class GenericOption {
    constructor(
    public id: number,
    public value?: string,
  ) {}
}

