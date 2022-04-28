import { GetTest200Response, GetTestResponse, TestApi } from '../../../dist/api/test/types';

export class TestApiImpl implements TestApi {
    getTest(): Promise<GetTestResponse> {	
        return new Promise<GetTestResponse>((resolve, reject) => {
            const tr = <GetTest200Response>{
                status: 200,
                body: {
                    message: "hi"
                }
            }
            resolve(tr)
        });
    }
}
