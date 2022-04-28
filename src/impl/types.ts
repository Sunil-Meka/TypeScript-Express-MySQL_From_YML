import { TestApi } from '../../dist/api/test/types'
import {ApiImplementation} from '../../dist/types'
import { TestApiImpl } from './test/types';
import { UserApiImpl } from './user/types';
export class serviceImpl implements ApiImplementation{
	test:TestApiImpl = new TestApiImpl;
	user: UserApiImpl = new UserApiImpl;

}