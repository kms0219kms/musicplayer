function init() {
  try {
    if (new URLSearchParams(location.search).get('d')) {
      const params = Object.fromEntries(new URLSearchParams(location.search));
      const data = JSON.parse(decodeURIComponent(atob(params.d)));

      const { background, title, artist, audio } = data;
      const image = cropImage(data.image, '1080x1080');

      document.querySelector('.background').style.backgroundImage = `url("${background}")`
      document.querySelector('.image-wrapper div').style.backgroundImage = `url("${image}")`

      document.querySelector('.title').textContent = title
      document.querySelector('.artist').textContent = artist

      document.querySelector('.player source').src = audio.src
      document.querySelector('.player source').type = audio.type || ''

      document.title = `${title} - ${artist} | Ayaan's Music Player`

      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        artwork: [{
          src: image,
          sizes: '1080x1080',
          type: 'image/jpg',
        }],
      })
    } else {
      if (top == self) {
        alert('잘못된 접근입니다.')
      }
    }
  } catch (e) {
    if (top == self) {
      alert('음악 정보를 불러오는 중 서버에 오류가 발생했습니다.')
    }
    console.error(e)
  }

  const player = new GreenAudioPlayer('.player')
}

document.addEventListener('DOMContentLoaded', init)