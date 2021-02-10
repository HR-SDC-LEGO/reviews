/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-mutable-exports */
import { Rate } from 'k6/metrics';
import http from 'k6/http';

let errorRate = new Rate('errorRate');

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 500,
      stages: [
        { target: 10, duration: '2m' },
        { target: 10, duration: '5m' },
        { target: 100, duration: '2m' },
        { target: 100, duration: '5m' },
        { target: 500, duration: '2m' },
        { target: 500, duration: '5m' },
        { target: 1000, duration: '2m' },
        { target: 1000, duration: '5m' }
      ]
    }
  }
};

export default function () {
  let random = Math.floor(Math.random() * 10000000) + 1;
  let res = http.get(`http://localhost:3003/api/products/${random}/reviews`, {
    tags: { name: 'ProductsURL' }
  });

  errorRate.add(res.status >= 400);
}