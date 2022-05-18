export const parseTmp = (template: string, id: string) => {
  const el = new DOMParser().parseFromString(template, 'text/html').body.firstChild;
  el?.parentElement?.firstElementChild?.setAttribute('component_id', id);
  return el;
};
