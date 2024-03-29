/** Получает элемент в виде строки и возвращает Element с переданным для него id */
export const parseTmp = (template: string, id: string) => {
  const parser = new window.DOMParser();

  const node = parser.parseFromString(template, 'text/html').body.firstChild;
  if (!node) {
    throw new Error(`parseTmp: Cannot parse template to node. ${template}`);
  }

  const element = node.parentElement?.firstElementChild;
  if (!element) {
    throw new Error(`parseTmp: Cannot parse template to element. ${template}`);
  }

  element.setAttribute('component_id', id);

  return element;
};
