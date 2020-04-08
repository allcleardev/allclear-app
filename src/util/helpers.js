import {useLayoutEffect, useState} from 'react';
import {debounce} from 'lodash';

export function colorLog(color, input) {
  console.log(`%c${input}`, `color:${color};`);
};

export function useWindowResize(updateFunc) {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
      updateFunc({width: window.innerWidth, height: window.innerHeight});
    }

    const debouncedFunc = debounce(updateSize, 400);
    window.addEventListener('resize', debouncedFunc);
    updateSize();
    return () => window.removeEventListener('resize', debouncedFunc);
    // TODO: figure out correct syntax to pass callback into useLayoutEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return size;
}

export function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}
