
export function getAllProducts(url) {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open("GET", url);

        xhr.onload = function () {

            if (xhr.readyState === 4 && xhr.status === 200) {

                resolve(xhr.responseText);

            } else {

                reject(Error(`Error With Status ${xhr.status}`));

            }

        }

        xhr.send();

    });

}

export function addProductToCart(url, body) {

    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.send(JSON.stringify(body));

}

export function updateQuantity(url, body) {

    const xhr = new XMLHttpRequest();

    xhr.open("PATCH", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.send(JSON.stringify(body));

}

export function deleteProductFromCart(url) {

    const xhr = new XMLHttpRequest();

    xhr.open("DELETE", url, true);

    xhr.send();

}
