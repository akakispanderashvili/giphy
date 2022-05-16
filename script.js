let baseUrl = "https://api.giphy.com/v1/gifs";
let apiKey = "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB";
let trendingUrl = `${baseUrl}/trending?api_key=${apiKey}&limit=10&q=`;
let topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];
let searchWord = document.getElementById("user-search");
let searchUrl = `${baseUrl}/search?api_key=${apiKey}&limit=10&q=`;
let submit = document.getElementById("submit");

let gifObject = {
  api_key: "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB",
  elements: document.getElementsByClassName("gif-boxes"),
  gifs: [],
  renderGifs: function (gifsHtml) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = gifsHtml;
    }
  },
  returnGifHtml: function (gif) {
    console.log(gif);
    return ` <div class="gif-box">  <img src="${gif.images.original.url}" alt="${gif.title}">
    <h6>Rating: ${gif.rating}</h6></div>
    `;
  },
  returnGifsHtml: function (gifs) {
    let gifListHtml = gifs.map((gif) => {
      return this.returnGifHtml(gif);
    });
    return gifListHtml;
  },
  render: function (gifs) {
    let gifsHtml = this.returnGifsHtml(gifs).join("");
    this.renderGifs(gifsHtml);
  },
  getGifs: async function (url) {
    fetch(url)
      .then((response) => response.json())
      .then((content) => {
        this.gifs = content.data;
        this.render(this.gifs);
      });
  },
  getSearch: async function (url) {
    fetch(url)
      .then((response) => response.json())
      .then((content) => {
        this.gifs = content.data;
        this.render(this.gifs);
      });
  },
};

let topicsObject = {
  elements: document.getElementsByClassName("topics"),
  renderTopics: function (topicsHtml) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = topicsHtml;
    }
  },
  returnTopicHtml: function (topic) {
    return `<button class="btn">${topic}</button>
      `;
  },
  returnTopicsHtml: function (topics) {
    let topicListHtml = topics.map((topic) => {
      return this.returnTopicHtml(topic);
    });
    return topicListHtml;
  },
  render: function (topics) {
    let topicsHtml = this.returnTopicsHtml(topics).join("");
    this.renderTopics(topicsHtml);
  },
};

function onTrendingClick() {
  gifObject.getGifs(trendingUrl);
}
function onSubmitClick() {
  addTopic(searchWord);
  gifObject.getGifs(searchUrl + searchWord.value);
}
function addTopic(searchWord) {
  if (searchWord.value !== "") {
    topics.push(searchWord.value);
    if (topics.length > 6) {
      topics.shift();
    }
  }
  topicsObject.render(topics);
}

topicsObject.render(topics);

function searchGifs() {
  gifObject.getGifs(searchUrl);
}
