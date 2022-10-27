import httpService from './http.service';
import { v4 as uuidV4 } from 'uuid';

const todosEndpoint = '/todos';

const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                limit: 10
            }
        });
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(todosEndpoint, payload);
        return { ...data, id: uuidV4() };
    }
};

export default todosService;
