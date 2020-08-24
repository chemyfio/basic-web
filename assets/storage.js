function checkForStorage() {
    return typeof (Storage) !== "undefined"
}

function putCart(data) {
    if (checkForStorage()) {
        let qtyStorage = null;
        if (data.value !== 0) {
            if (sessionStorage.getItem(data.key) === null) {
                qtyStorage = data.value;
            } else {
                qtyStorage = parseInt(sessionStorage.getItem(data.key)) + data.value;
            }
            sessionStorage.setItem(data.key, qtyStorage);
        }
    }
}

function getCartItem(key){
    if (checkForStorage()) {
        return parseInt(sessionStorage.getItem(key)) || 0;
    } else {
        return 0;
    }
}

function getFromSessionStorage(){
    let allKeys = Object.keys(sessionStorage);
    let result = new Map();
    allKeys.forEach(k => {
        result.set(k, getCartItem(k));
    });
    return result;
}

