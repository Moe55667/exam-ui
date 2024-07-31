import { createFetch } from '@vueuse/core';

const baseURL = 'https://exam-api.up.railway.app/';

const useFetch = createFetch({
  baseUrl: baseURL,
  options: {
    async beforeFetch({ options }) {
      const token = localStorage.getItem('auth_token'); 
      options.headers = {
        ...options.headers,
        'Authorization': `Token ${token}`,
      };

      // Only set Content-Type to application/json if the body is not FormData
      if (!(options.body instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json';
      }

      return { options };
    },
    afterFetch(ctx) {
      if (ctx.response.status !== 200) {
        ctx.data = null;
        ctx.error = new Error('Failed to fetch');
      }
      return ctx;
    },
  },
});
export { useFetch };
