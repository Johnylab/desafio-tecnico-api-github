import ObjectStorage from '../utils/JSONLocalStorage';
import { UserData } from './types';

const userStorage = new ObjectStorage<UserData>('@gh-user');

export { userStorage };
