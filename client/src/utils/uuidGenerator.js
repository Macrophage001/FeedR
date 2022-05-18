export const generateUUID = (pre) => {
    return `${pre}_${new Date().getTime()}`;
}