export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return { isValid, errorMsg: "" };
    }

    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
        if (!isValid) {
            return { isValid, errorMsg: "Please enter a valid value." };
        }
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        if (!isValid) {
            return { isValid, errorMsg: `Length should be at least ${rules.minLength}.` };
        }
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
        if (!isValid) {
            return { isValid, errorMsg: `Length should be at max ${rules.minLength}.` };
        }
    }

    if (rules.isEmail) {
        const pattern =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
        if (!isValid) {
            return { isValid, errorMsg: `Should be a valid email.` };
        }
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
        if (!isValid) {
            return { isValid, errorMsg: `Should be numeric only.` };
        }
    }

    return { isValid, errorMsg: "" };
};
