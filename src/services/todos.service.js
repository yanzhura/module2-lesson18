import httpService from './http.service';

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
    }
};

export default todosService;
