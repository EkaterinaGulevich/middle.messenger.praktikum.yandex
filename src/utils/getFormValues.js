export function getFormData(formElement) {
    const formData = new FormData(formElement);
    const result = {};

    for (const [key, value] of formData.entries()) {
        result[key] = value;
    }

    return result;
}
