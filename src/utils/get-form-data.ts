export function getFormData(formName: string): Record<string, string> {
  const formElement = document.forms.namedItem(formName);
  if (!formElement) {
    throw Error(`Not found form named "${formName}" in DOM`);
  }
  const formData = new FormData(formElement);

  const result: Record<string, string> = {};

  Array.from(formData.entries()).forEach(([key, value]) => {
    result[key] = value.toString();
  });

  return result;
}
