export class GetListBaseModel{
    constructor(
        public limit: number,
        public offset: number,
        public value: string
    ){}
}