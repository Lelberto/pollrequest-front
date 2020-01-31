export async function saveItem(key: string, value: string) {
    try {
        await localStorage.setItem(key, value);
    } catch (e) {
        throw(e);
    }
};

export async function getItem(key: string) {
    try {
        return await localStorage.getItem(key);
    } catch (e) {
        throw(e);
    }
};

export async function removeItem(key: string) {
    try {
        await localStorage.removeItem(key);
    } catch (e) {
        throw(e);
    }
};
