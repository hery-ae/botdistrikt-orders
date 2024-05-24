import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  app_title = () => {
    return document.title;
  };
}
