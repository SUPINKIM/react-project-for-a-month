import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.post('/form', async () => {
    await delay(2000);
    return HttpResponse.json({
      meta: { status: 200, resultMsg: '폼 제출이 완료되었습니다.' },
    });
  }),
];
