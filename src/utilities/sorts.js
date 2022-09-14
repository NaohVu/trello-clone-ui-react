export const mapOder = (array, oder, key) => {
    if (!array || !oder || !key) {
        return [];
    }
    array.sort((a, b) => oder.indexOf(a[key]) - oder.indexOf(b[key]));
    return array;
};
