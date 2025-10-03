export function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function deepSearch(obj, searchTerm) {
  let stack = [obj];

  while (stack.length > 0) {
    let current = stack.pop();
    for (let key in current) {
      if (Object.prototype.toString.call(current[key]) === "[object Object]") {
        stack.push(current[key]);
      } else if (
        Object.prototype.toString.call(current[key]) === "[object Array]"
      ) {
        current[key].forEach((item) => stack.push(item));
      } else {
        if (
          current[key] &&
          current[key]
            .toString()
            .toLowerCase()
            .trim()
            .indexOf(searchTerm.toString().toLowerCase().trim()) > -1
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
