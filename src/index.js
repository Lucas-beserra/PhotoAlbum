/* VARIÁVEIS PARA O CONSUMO DA API */
const url = 'https://api.pexels.com/v1/search?query=nature'
const everyPhotos = document.querySelectorAll('.photos')
const authors = document.querySelectorAll('.author')

/* VARIÁVEIS DO MODAL */
const modal = document.querySelector('.modal')
const imageModal = document.querySelector('.img-modal')
const buttonCloseModal = document.querySelector('.button-close')
const buttonDownload = document.querySelector('.button-download')

/* VARIÁVEIS DO MENU MOBILE */
const btnMenuMobile = document.getElementById('button-menu')

/* CONSUMO DA API */
function getPhotos() {
  axios
    .get(url, {
      headers: {
        Authorization:
          '563492ad6f91700001000001f7bb3f3c8d6b418483bf693e105fbe02'
      }
    })
    .then(response => {
      let data = response.data

      for (let a = 0; a < authors.length; a++) {
        authors[a].href = data.photos[a].photographer_url

        authors[a].innerText = data.photos[a].photographer
      }

      console.log(data)

      for (let i = 0; i < everyPhotos.length; i++) {
        everyPhotos[i].src = data.photos[i].src.tiny
      }

      /****** MODAL EFFECT  ********/
      for (let m = 0; m < everyPhotos.length; m++) {
        everyPhotos[m].addEventListener('click', () => {
          let src = data.photos[m].src.tiny
          let idPhoto = data.photos[m].id
          let downloadSrc = `https://pexels.com/photo/${idPhoto}/download/`

          modal.classList.toggle('modal-active')

          imageModal.setAttribute('src', src)

          buttonDownload.href = downloadSrc
        })
      }

      buttonCloseModal.addEventListener('click', () => {
        modal.classList.toggle('modal-active')
      })
    })
    .catch(error => console.log(error))
}

btnMenuMobile.addEventListener('click', () => {
  const nav = document.querySelector('.navbar')

  nav.classList.toggle('active')
})

/* function lazyLoad() {
  everyPhotos.forEach((img, index) => {
    if (img.getBoundingClientRect().top < window.innerHeight) {
      img.src = img.getAttribute('src')
      console.log(`imagem ${index} apareceu`)
    }
  })
} */

getPhotos()
/* document.addEventListener('scroll', lazyLoad)
 */
