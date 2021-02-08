/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-mutable-exports */
import { Rate } from 'k6/metrics';
import http from 'k6/http';
import { sleep } from 'k6';

let errorRate = new Rate('errorRate');

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 500 // if the preAllocatedVUs are not enough, we can initialize more
    }
  }
};

export default function () {
  let random = Math.ceil(Math.random() * 10000000);
  let resp = http.get(`http://localhost:3003/api/products/${random}/reviews`, {
    tags: { name: 'ProductsURL' }
  });

  errorRate.add(resp.status >= 400);
}