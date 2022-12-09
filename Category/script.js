import axios from "axios";

const options = {
  method: "GET",
  url: "https://app-stores.p.rapidapi.com/reviews",
  params: { store: "google", id: "com.snapchat.android", language: "en" },
  headers: {
    "X-RapidAPI-Key": "29be25ffe2msha33f08e071a76b7p1e3317jsna31331d2dddd",
    "X-RapidAPI-Host": "app-stores.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
