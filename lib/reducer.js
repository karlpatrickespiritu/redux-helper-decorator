import { combineReducers } from 'redux';
import forEach from 'lodash/forEach';

const reducerCollections = {}

export const getReducers = () => {
  let allReducers = {};
  /**
   * We wil loop through the reducerCollections. We will combine all reducers that are map on a single key.
   */
  forEach(reducerCollections, (reducer, key) => {
    if (typeof reducer === 'function') {
      allReducers[key] = reducer;
    } else {
      allReducers[key] = combineReducers(reducer);
    }
  })
  return allReducers;
}

export function reducer(name, parent) {
  return function decorator(Class) {
    return (...args) => {
      const cls = new Class(...args);
      if (!cls.reducerHandler) {
        throw new Error('Class decorated with "reducer" must have a method "reducerHandler".');
      }
      if (parent) {
        if (!reducerCollections[parent]) {
          reducerCollections[parent] = {}
        }
        reducerCollections[parent][name] = cls.reducerHandler;
      } else {
        reducerCollections[name] = cls.reducerHandler;
      }
      return cls;
    };
  }
}