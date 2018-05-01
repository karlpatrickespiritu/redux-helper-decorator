## redux-helper-decorator

### Description
This library is created for a specific behavior. This might not be fit or some functionalities might not be fit to other behaviour.

Methods available:
1. `getReducers`
2. `getSocketResponseHandlerList`

`getReducers` -> Return all reducers in classes decorated with `@reducer`. This method will return a JSON object. Think of the JSON passed to `createStore` of Redux.

`getSocketResponseHandlerList` -> Return all function that handles the socket response.
all functions stored here accepts a JSON parameter { store, response }.
*NOTE*: This is created for specific beheviour.

Decorators:
1. `@reducer` - Instead of decorating the class, this is more on registering the class for it to be retrieved using `getReducers`.
Parameter:
  1. `name` -> name that would be use for the class reducer when passed to `createStore`.
  2. `parentName` -> Will be used if the reducer will be combined with multiple reducers. 
  {
    parentName: combineReducers({ 
      name: ...
    })
  }


2. `@emitAction` -> This is a function decorator, this must return a payload `{m: string, v: any}` that will be passed to `emit`.

Parameters:
  1. `name` -> name of the action type. This method will also automatically dispatch a success or fail actions.
  
  If you pass "awesome", then the success will be "awesome_SUCCESS" and the fail will be "awesome_FAIL".

*NOTE*: It is expected that the project uses Redux along with Redux-Thunk and a extra argument, name emit is passed.

When calling method decorated with this, a dispatch event will be passed using the `name` parameter as `type` of the event dispatch. The payload of the data can also be passed to the initial dispatch by passing a second boolean parameter to `@emitAction`.

##NOTE for @emitAction
This is made specifically to a behaviour that is currently used on a project. This might not be usable to others.

Example:
```
  //'awesome' string will be dispatch as action.
  @emitAction('awesome')
  doSomethingAwesome() {
    return {
      m: '/api',
      v: { name: 'decorator' }
    }
  }


```
