import React from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const App = observer(({ store }) => {
  const handlePlusClick = () => {
    store.increment();
  };
  const handleMinusClick = () => {
      store.decrement();
  }
  const handleUsersClick = () => {
      if (store.users) {
          return
      }
    store.fetchUsers()
  };

  const changeHandler = (e) => {
   (store.setChecked(e.target.id))
  };

  return (
    <div>
        <div className='counter'>
            <button onClick={handleMinusClick}>&#8722;</button>
            <h1>{store.count}</h1>
            <button onClick={handlePlusClick}>&#43;</button>
        </div>

      <button onClick={handleUsersClick}>Fetch users</button>
      {toJS(store.users).map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={item.isChecked}
            id={item.id}
            onChange={changeHandler}
          />
          <label>{item.name}</label>
        </div>
      ))}
    </div>
  );
});

export default App;
