/* TODO
    1. deal with unavailable #availability element
    2. work around pagination trash
*/

const wishList = document.getElementById('g-items')
const listItems = wishList.querySelectorAll('li')
listItems.forEach(e => {
    const url = e.querySelector('.g-itemImage a').href
    const container = e.querySelector('.a-section.price-section') || e.querySelector('.itemAvailability')
    fetchProdAvailability(url, container)
})

function fetchProdAvailability(url, container) {
    fetch(url).then(function (response) {
        return response.text()
    }).then(function (html) {
        const parser = new DOMParser()
        const product = parser.parseFromString(html,'text/html')
        const productAvailability = product.querySelector('#availability').innerText.replace(/\n/g,'')

        const productAvailEl = document.createElement('div')
        productAvailEl.classList.add('a-size-medium')
        if(!productAvailability.startsWith('In Stock')){
            productAvailEl.classList.add('a-color-price')
        } else{
            productAvailEl.classList.add('a-color-success')
        }
        productAvailEl.innerText = productAvailability
        container.appendChild(productAvailEl)
    }).catch(function (err) {
        console.warn('Something went wrong.', err)
    })
}