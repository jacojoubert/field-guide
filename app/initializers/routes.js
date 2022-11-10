/* eslint-disable prettier/prettier */
import Router from '../router';

export function initialize() {
  Router.map(function () {
    this.route('show', { path: '/docs/*path' });
  });
}

export default {
  initialize,
};
