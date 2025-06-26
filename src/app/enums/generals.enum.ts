import { GenericOption } from '../models/selector/select-request-body.model';

export enum UserStatusEnum {
  ALL = 'all',
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export function UserStatusListEnum(): GenericOption[] {
  return [
    { id: UserStatusEnum.ALL, value: 'Todos' },
    { id: UserStatusEnum.ENABLED, value: 'Habilitados' },
    { id: UserStatusEnum.DISABLED, value: 'Deshabilitados' },
  ];
}

export enum UserTypeEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export function UserTypeListEnum(): GenericOption[] {
  return [
    { id: UserTypeEnum.USER, value: 'Vendedor' },
    { id: UserTypeEnum.ADMIN, value: 'Administrador' },
  ];
}
