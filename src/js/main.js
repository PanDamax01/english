const motivateBtn = document.querySelector('button.landing__btn')
const modal = document.querySelector('.modal')
const modalBtns = document.querySelectorAll('.modal__btn')
const landing = document.querySelector('.landing')

const pictureIcon = document.querySelector('.picture-icon')
const musicIcon = document.querySelector('.music-icon')
const mp3 = document.querySelector('.music')
let value = 0

const memeBtn = document.querySelector('.meme-btn')
const memeBtnCancel = document.querySelector('.meme__btn')
const memeDiv = document.querySelector('.meme')

let background = localStorage.getItem('background') || 1
landing.style.backgroundImage = `url(dist/img/${background}.gif)`

const setStyle = (places, style) => {
    places.forEach(el => el.style.display = `${style}`)
}

const openModal = () => {
	modal.classList.add('open')
	landing.classList.add('filter')
    setStyle([pictureIcon, musicIcon, memeBtn], 'none')
}

const closeModal = () => {
    modal.classList.remove('open')
	landing.classList.remove('filter')
    setStyle([pictureIcon, musicIcon, memeBtn], 'flex')
}

const setImg = () => {
	value === 3 ? (value = 0) : value++
    localStorage.setItem('background', value)
	landing.style.backgroundImage = `url(dist/img/${value}.gif)`
}

const setMusic = () => {
	const isMuted = musicIcon.getAttribute('src') === 'dist/img/mute.png'

	musicIcon.setAttribute('src', isMuted ? 'dist/img/volume.png' : 'dist/img/mute.png')
	isMuted ? mp3.play() : mp3.pause()
}

const getRandomMeme = async () => {
	try {
		const response = await fetch(
			'https://www.reddit.com/r/polska_wpz/random.json'
		)
		const data = await response.json()
		const memeUrl = await data[0].data.children[0].data.url_overridden_by_dest
		setMeme(memeUrl)
	} catch (error) {
		console.log(error)
	}
}

const setMeme = (memeUrl) => {
	memeDiv.style.display = 'block'
	document.querySelector('.meme__img').setAttribute('src', memeUrl)
    if (document.querySelector('.meme__img').getAttribute('src') === null) {
        alert('Nie dobry mem')
    }
}

const closeMeme = () => {
	memeDiv.style.display = 'none'
}

motivateBtn.addEventListener('click', openModal)
modalBtns.forEach((el) => el.addEventListener('click', closeModal))
pictureIcon.addEventListener('click', setImg)
musicIcon.addEventListener('click', setMusic)
memeBtn.addEventListener('click', getRandomMeme)
memeBtnCancel.addEventListener('click', closeMeme)