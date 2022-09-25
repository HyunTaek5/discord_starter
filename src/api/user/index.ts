import { api } from '../../utils/axios';
import { PATHS } from './path';
import { GetUserResponse } from './type';

export async function getUserByName(
  username: string,
): Promise<GetUserResponse> {
  const { data } = await api.get<GetUserResponse>(
    PATHS.getUserByName(username),
  );

  return data;
}
