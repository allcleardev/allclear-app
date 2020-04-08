import { createStore } from 'redux';
import rootReducer from './reducers';

export default createStore(rootReducer);



// import { createStore } from 'redux'
//
// import rootReducer from './reducers'
//
// const configureStore = () => {
//   const store = createStore(rootReducer);
//
//   if (process.env.NODE_ENV !== 'production') {
//     if (module.hot) {
//       module.hot.accept('./reducers', () => {
//         console.log('%c ===== Hot Reload ===== ', 'background: #222; color: #bada55');
//         store.replaceReducer(rootReducer);
//       });
//     }
//   }
//
//   return store;
// };
//
// export default configureStore()
