let baseUrl = "https://api.giphy.com/v1/gifs";
let apiKey = "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB";
let trendingUrl = `${baseUrl}/trending?api_key=${apiKey}&limit=10&q=`;
let searchUrl = `${baseUrl}search?api_key=${apiKey}&limit=10&q=`;
let topics = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];
let searchWord = document.getElementById("user-search");
let submit = document.getElementById("submit")
let gifObject = {
  api_key: "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB",
  elements: document.getElementsByClassName("gif-box"),
  gifs: [],
  renderGifs: function (gifsHtml) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = gifsHtml;
    }
  },
  returnGifHtml: function (gif) {
    return ` <img src="${gif.images.original.url}" alt="${gif.title}">
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
};



submit.addEventListener('click', (event) => {
    console.log(topics);


    let searchWord = document.getElementById("user-search");
    console.log(searchWord.value);
    if (searchWord.value!=="") {
        topics.push(searchWord.value);
        console.log(topics);
        if (topics.length > 6) {
            topics.shift();
            console.log(topics);
        }
    }
})


function onTrendingClick() {
  gifObject.getGifs(trendingUrl);
}



function onSearch() {
  const result = document.getElementById;
  let url = searchUrl + result;
}
