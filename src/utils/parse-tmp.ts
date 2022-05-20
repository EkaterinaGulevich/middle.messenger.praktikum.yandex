export const parseTmp = (template: string, id: string) => {
  const node = new DOMParser().parseFromString(template, 'text/html').body.firstChild;
  if (!node) {
    throw new Error(`parseTmp: Cannot parse template to node. ${template}`);
  }

  const element = node.parentElement?.firstElementChild;
  if (!element) {
    throw new Error(`parseTmp: Cannot parse template to element. ${template}`);
  }

  element.setAttribute('component_id', id);

  return node;
};
