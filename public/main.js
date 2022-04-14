const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'PLAYER';

const player = $('.player');
const heading = $('header h2');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const volumeBtn = $('.btn-volume');
const volumeProgress = $('#volume-progress');
const progress = $('#progress');
const currentTime = $('.current-time');
const endTime = $('.end-time');
const playList = $('.playlist');

const app = {
  songIndexes: [],
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isVolumeOff: false,
  songs: [
    {
      name: 'Đám Cưới Nha?',
      singer: 'Hồng Thanh, DJ Mie',
      path: './songs/dam_cuoi_nha.mp3',
      image: './images/dam_cuoi_nha.png',
    },
    {
      name: 'Muốn Em Là',
      singer: 'Keyo',
      path: './songs/muon_em_la.mp3',
      image: './images/muon_em_la.png',
    },
    {
      name: 'Chạy Về Nơi Phía Anh',
      singer: 'Khắc Việt',
      path: './songs/chay_ve_noi_phia_anh.mp3',
      image: './images/chay_ve_noi_phia_anh.png',
    },
    {
      name: 'Người Tôi Yêu Chẳng Hề Yêu Tôi',
      singer: 'Chi Dân',
      path: './songs/nguoi_toi_yeu_chang_he_yeu_toi.mp3',
      image: './images/nguoi_toi_yeu_chang_he_yeu_toi.png',
    },
    {
      name: 'May Mắn Khi Có Em',
      singer: 'Đạt Villa, Phạm Sắc Lệnh',
      path: './songs/may_man_khi_co_em.mp3',
      image: './images/may_man_khi_co_em.png',
    },
    {
      name: 'Khi Nào (Hoàn Châu Cách Cách OST)',
      singer: 'Hương Ly',
      path: './songs/khi_nao.mp3',
      image: './images/khi_nao.png',
    },
    {
      name: 'Rung Động',
      singer: 'Dương Edward',
      path: './songs/rung_dong.mp3',
      image: './images/rung_dong.png',
    },
    {
      name: 'Thương Em Không',
      singer: 'Saka Trương Tuyền, Lưu Hưng',
      path: './songs/thuong_em_khong.mp3',
      image: './images/thuong_em_khong.png',
    },
    {
      name: 'Như Mùa Tuyết Đầu Tiên',
      singer: 'Mr.B',
      path: './songs/nhu_mua_tuyet_dau_tien.mp3',
      image: './images/nhu_mua_tuyet_dau_tien.png',
    },
    {
      name: 'Tình Đơn Côi',
      singer: 'Vicky Nhung, Long Rex',
      path: './songs/tinh_don_coi.mp3',
      image: './images/tinh_don_coi.png',
    },
  ],
  config: JSON.parse(localStorage.getItem('PLAYER_STORAGE_KEY')) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem('PLAYER_STORAGE_KEY', JSON.stringify(this.config));
  },
  // C2 - Định nghĩa thuộc tính mới cho Object
  // để lấy ra bài hát đầu tiên
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  // C1 - Lấy ra bài hát đầu tiên
  // getCurrentSong: function () {
  //   return this.songs[this.currentIndex];
  // },
  render: function () {
    const html = this.songs.map((song, index) => {
      return `
            <div class="song active:opacity-70 song-item-${index} ${
        index === 0 ? 'song-active' : ''
      } flex max-w-[460px] p-3 mx-auto my-3 shadow-sm hover:opacity-90 rounded-lg cursor-pointer bg-white" data-index="${index}">
              <div
                  class="w-12 h-12 rounded-[50%] bg-cover my-auto ml-2 mr-5"
                  style="background-image: url('${song.image}')"
              ></div>
              <div class="flex-1">
                  <h3 class="title text-xl font-bold">${song.name}</h3>
                  <p class="singer text-lg">${song.singer}</p>
              </div>
              <div class="option hover:rounded-[50%] hover:bg-gray-300 text-xl my-auto">
                  <i class="p-2 fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
        `;
    });
    playList.innerHTML = html.join('');
  },
  handleEvent: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
      duration: 50000, // 50 seconds
      iterations: Infinity, // Loop
    });
    cdThumbAnimate.pause();

    // Xử lý thu nhỏ / phóng to CD thumb
    document.addEventListener('scroll', function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const cdNewWidth = cdWidth - scrollTop;

      cd.style.width = cdNewWidth > 0 ? cdNewWidth + 'px' : 0;
      cd.style.opacity = cdNewWidth / cdWidth;
    });

    // Xử lý khi bấm Play
    playBtn.addEventListener('click', function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    });

    // Xử lý khi bấm nút Next
    nextBtn.addEventListener('click', function () {
      $(`.song.song-item-${_this.currentIndex}`).classList.remove(
        'song-active'
      );
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      $(`.song.song-item-${_this.currentIndex}`).classList.add('song-active');
      _this.scrollToActiveSong();
      audio.play();
    });

    // Xử lý khi bấm nút Prev
    prevBtn.addEventListener('click', function () {
      $(`.song.song-item-${_this.currentIndex}`).classList.remove(
        'song-active'
      );
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      $(`.song.song-item-${_this.currentIndex}`).classList.add('song-active');
      _this.scrollToActiveSong();
      audio.play();
    });

    // Xử lý khi bấm nút Random
    randomBtn.addEventListener('click', function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      randomBtn.classList.toggle('btn-active', _this.isRandom);
    });

    // Xử lý khi bấm nút Repeat
    repeatBtn.addEventListener('click', function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig('isRepeat', _this.isRepeat);
      repeatBtn.classList.toggle('btn-active', _this.isRepeat);
    });

    // Xử lý khi bấm nút Volume
    volumeBtn.addEventListener('click', function () {
      const oldVolume = audio.volume * 100;
      _this.isVolumeOff = !_this.isVolumeOff;
      volumeBtn.classList.toggle('btn-volume-off', _this.isVolumeOn);
      volumeProgress.value = _this.isVolumeOff ? 0 : oldVolume;
      audio.muted = _this.isVolumeOff;
    });

    // Xử lý khi bấm vào thanh volume
    volumeProgress.addEventListener('input', function (e) {
      const newVolume = e.target.value / 100;
      audio.volume = newVolume;
    });

    // Xử lý khi bấm thanh progress
    progress.addEventListener('input', function (e) {
      const seekTime = (e.target.value * audio.duration) / 100;
      audio.currentTime = seekTime;
    });

    // Xử lý khi bấm vào playlist
    playList.addEventListener('click', function (e) {
      const songElement = e.target.closest('.song:not(.song-active)');
      const optionElement = e.target.closest('.option');

      if (optionElement) {
        alert(`
            Bài hát - ${_this.currentSong.name}
            Ca sĩ - ${_this.currentSong.singer}
          `);
      } else {
        $(`.song.song-item-${_this.currentIndex}`).classList.remove(
          'song-active'
        );
        _this.currentIndex = Number(songElement.dataset.index);
        $(`.song.song-item-${_this.currentIndex}`).classList.add('song-active');
        _this.loadCurrentSong();
        audio.play();
      }
    });

    // Nghe sự kiện khi bài hát được play
    audio.addEventListener('play', function () {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    });

    // Nghe sự kiện khi bài hát bị pause
    audio.addEventListener('pause', function () {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    });

    // Nghe sự kiện khi bài hát được tua
    audio.addEventListener('timeupdate', function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
        currentTime.innerText = _this.secondsToMinute(audio.currentTime);
      }
    });

    // Nghe sự kiện khi bài hát kết thúc
    audio.addEventListener('ended', function () {
      if (_this.isRepeat) {
        audio.play();
      } else if (_this.isRandom) {
        _this.randomSong();
        audio.play();
      } else {
        nextBtn.click();
      }
    });
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $('.song-active').scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.innerText = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    currentTime.innerText = this.secondsToMinute(audio.currentTime);
    audio.onloadedmetadata = () => {
      endTime.innerText = this.secondsToMinute(audio.duration);
    };
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;

    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    console.log(this.currentIndex, newIndex);
    if (this.songIndexes.length >= this.songs.length) {
      this.songIndexes.length = 0;
    }
    if (!this.songIndexes.includes(newIndex)) {
      this.songIndexes.push(newIndex);
      this.currentIndex = newIndex;
      this.loadCurrentSong();
    } else {
      this.randomSong();
    }
    console.log(this.songIndexes);
  },
  secondsToMinute: function (e) {
    var m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, '0');
    var s = Math.floor(e % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    this.loadConfig();

    // Định nghĩa các thuộc tính của Object
    this.defineProperties();

    // Xử lý các sự kiện (DOM Events)
    this.handleEvent();

    // Tải bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của nút Random & Repeat
    randomBtn.classList.toggle('btn-active', this.isRandom);
    repeatBtn.classList.toggle('btn-active', this.isRepeat);

    audio.volume = 0.5;
  },
};

app.start();
