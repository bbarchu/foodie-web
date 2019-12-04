export const sortByKey = (array, key)=> {
    if (array.length > 0) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    } else {
        return array;
    }
}