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
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isVolumeOff: false,
  songs: [
    {
      name: 'Đám Cưới Nha?',
      singer: 'Hồng Thanh, DJ Mie',
      path: 'https://vnso-zn-10-tf-mp3-320s1-m-zmp3.zmdcdn.me/fe80177f4e3ea760fe2f/6252296707180606574?authen=exp=1649817776~acl=/fe80177f4e3ea760fe2f/*~hmac=974fb5ed931c2312ccce8029cbef99b1&fs=MTY0OTY0NDk3NjY5NXx3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/5/b/8/b/5b8b7cd3d1434afa3b2b9854efdc8756.jpg',
    },
    {
      name: 'Muốn Em Là',
      singer: 'Keyo',
      path: 'https://vnso-zn-23-tf-mp3-320s1-m-zmp3.zmdcdn.me/8b03e577be3657680e27/1985382090461400208?authen=exp=1649817919~acl=/8b03e577be3657680e27/*~hmac=15e30ac5fdcf35572afbdbfaf8690be0&fs=MTY0OTY0NTExOTmUsIC0MXx3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/7/4/0/9/7409e051f6f27cb8e6d241654ebb20d3.jpg',
    },
    {
      name: 'Chạy Về Phía Anh',
      singer: 'Khắc Việt',
      path: 'https://vnso-zn-24-tf-mp3-320s1-m-zmp3.zmdcdn.me/6439a37bce3a27647e2b/4974064795925961644?authen=exp=1649817970~acl=/6439a37bce3a27647e2b/*~hmac=c47e5aaa7b8722e02656ae87d35b7181&fs=MTY0OTY0NTE3MDgyN3x3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/6/3/0/d/630d20b0a79917e1545b4e2ada081040.jpg',
    },
    {
      name: 'Người Tôi Yêu Chẳng Hề Yêu Tôi',
      singer: 'Chi Dân',
      path: 'https://vnso-zn-24-tf-mp3-320s1-m-zmp3.zmdcdn.me/1082eadbac9a45c41c8b/6030827680538899229?authen=exp=1649818052~acl=/1082eadbac9a45c41c8b/*~hmac=412926ffb07eae02c405103f2e3faa78&fs=MTY0OTY0NTI1MjE2N3x3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/2/9/1/b/291b5a81f266d588cf4344766676a140.jpg',
    },
    {
      name: 'May Mắn Khi Có Em',
      singer: 'Đạt Villa, Phạm Sắc Lệnh',
      path: 'https://vnso-zn-23-tf-mp3-320s1-m-zmp3.zmdcdn.me/1cb4c6168b5762093b46/5250788465602710563?authen=exp=1649818125~acl=/1cb4c6168b5762093b46/*~hmac=e6377fc698b3f2c9aa0a437506fae823&fs=MTY0OTY0NTMyNTE0OXx3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/3/0/9/8/309880d36090dae9e8d72b17fd1a1785.jpg',
    },
    {
      name: 'Khi Nào (Hoàn Châu Cách Cách OST)',
      singer: 'Hương Ly',
      path: 'https://vnso-zn-24-tf-mp3-320s1-m-zmp3.zmdcdn.me/1283e6ffa8be41e018af/7656719676010625054?authen=exp=1649822134~acl=/1283e6ffa8be41e018af/*~hmac=b533147056033cf272d399a904893566&fs=MTY0OTY0OTMzNDk1NHx3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/4/7/5/1/475127c448df9e29a4ce598edb10e961.jpg',
    },
    {
      name: 'Rung Động',
      singer: 'Dương Edward',
      path: 'https://vnso-zn-10-tf-mp3-320s1-m-zmp3.zmdcdn.me/6c04ade4f8a511fb48b4/5735347877960093033?authen=exp=1649822249~acl=/6c04ade4f8a511fb48b4/*~hmac=4f00581a794097e22bed4e4061a06bf9&fs=MTY0OTY0OTQ0OTQ1OHx3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/d/e/3/8/de38ea78ded4ceaf57bd74b07125bcef.jpg',
    },
    {
      name: 'Thương Em Không',
      singer: 'Saka Trương Tuyền, Lưu Hưng',
      path: 'https://vnso-zn-5-tf-mp3-320s1-m-zmp3.zmdcdn.me/229726ba6afb83a5daea/1087524605915532883?authen=exp=1649822392~acl=/229726ba6afb83a5daea/*~hmac=172edd0f69844c9427513a4d8ba5d8fd&fs=MTY0OTY0OTU5MjQyOXx3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/2/0/f/9/20f91317e6ff0758c539eed897fdba03.jpg',
    },
    {
      name: 'Như Mùa Tuyết Đầu Tiên',
      singer: 'Mr.B',
      path: 'https://vnso-zn-10-tf-mp3-320s1-m-zmp3.zmdcdn.me/a95fbdccfb8d12d34b9c/5459861682116099420?authen=exp=1649923649~acl=/a95fbdccfb8d12d34b9c/*~hmac=e315336c27384170bd48ca36038fc9b8&fs=MTY0OTmUsIC1MDg0OTgyNnx3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/c/b/9/3/cb9376c62a3f035a1a7cac7d0e4a32d5.jpg',
    },
    {
      name: 'Tình Đơn Côi',
      singer: 'Vicky Nhung, Long Rex',
      path: 'https://vnso-zn-16-tf-mp3-320s1-m-zmp3.zmdcdn.me/1e5876371676ff28a667/7064362443539608727?authen=exp=1649923789~acl=/1e5876371676ff28a667/*~hmac=18667be15e562a737b15a1fcdacc1c66&fs=MTY0OTmUsIC1MDk4OTEzN3x3ZWJWNHwxMDMdUngODIdUngMjmUsICdUngODk',
      image:
        'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/1/0/f/f/10ffd25d9f1e2c095834d7377a0f954c.jpg',
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
    this.currentIndex = newIndex;
    this.loadCurrentSong();
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
