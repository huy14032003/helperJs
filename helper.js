

/**
 * 
 * @param {function} fn function xử lý search vd deepSearch
 * @param {int} delay time delay
 * @returns 
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
/**
 * 
 * @param {object} obj chuỗi obj cần search
 * @param {*} searchTerm giá trị search, thường là value của input
 * @returns 
 */
export function deepSearch(obj, searchTerm) {
  let stack = [obj];

  while (stack.length > 0) {
    let current = stack.pop();
    for (let key in current) {
      if (Object.prototype.toString.call(current[key]) === "[object Object]") {
        stack.push(current[key]);
      } else if (Object.prototype.toString.call(current[key]) === "[object Array]") {
        current[key].forEach((item) => stack.push(item));
      } else {
        if (
          current[key] &&
          current[key].toString().toLowerCase().trim().indexOf(searchTerm.toString().toLowerCase().trim()) > -1
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
/**
 * 
 * @param {number} input giá trị cần format
 */
export function allowOnlyNumbers(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9.]/g, "");
  });
}
/**
 * 
 * @param {value} value giá trị cần format
 * @returns 
 */
export function parseCurrency(value) {
  if (!value) return 0;
  let cleaned = value.toString().replace(/[^\d]/g, "");
  if (cleaned === "") return 0;
  return parseInt(cleaned, 10);
}

/**
 * 
 * @param {object} data data cần filter
 * @param {string} type loại desc lớn => nhỏ hoặc asc nhỏ => lớn
 * @returns 
 */
export function sortObj(data, type = "desc") {
  const arr = Object.entries(data);
  const sorted = arr.sort((a, b) => (type === "asc" ? a[1] - b[1] : b[1] - a[1]));
  return sorted.map(([key, value]) => ({ key, value }));
}
