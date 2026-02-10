export default function createElement(type, props = {}, ...children) {
  const element = document.createElement(type);

  Object.entries(props).forEach(([key, value]) => {
    if (key.includes("-")) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });

  children.forEach(child => {
    if (child) element.append(child);
  });

  return element;
}