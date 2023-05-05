import MyComponent from './MyComponent.vue';

MyComponent.install = function (app) {
  app.component(MyComponent.name, MyComponent);
};

export { MyComponent };
