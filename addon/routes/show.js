import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';

import normalisePath from '../utils/normalise-path';
import getParentToc from '../utils/get-parent-toc';

export default class ShowRoute extends Route {
  @service router;

  model(params) {
    // remove trailing slash
    let path = params.path.replace(/\/$/, '');

    if (path.endsWith('/index')) {
      return this.router.transitionTo('show', path.replace(/\/index$/, ''));
    }

    // check if there is a path/index in the TOC
    const toc = this.modelFor('application');
    const parent = getParentToc(toc, path);

    path = normalisePath(path, toc);

    return fetch(`${config.rootURL}docs/${path}.json`)
      .then((res) => res.json())
      .then((res) => {
        return {
          id: res.data.id,
          ...res.data.attributes,
          parent,
        };
      });
  }

  redirect(model) {
    if (model.id === 'index') {
      this.router.transitionTo('index');
    }
  }
}
