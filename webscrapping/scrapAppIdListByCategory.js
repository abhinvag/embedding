import axios from "axios";
import { load } from "cheerio";
import fs from "fs";

const getData = async (category) => {
  try {
    const { data } = await axios.get(
      `https://play.google.com/store/apps/category/${category}`
    );
    const $ = load(data);
    //const apps = $(".Si6A0c.ZD8Cqc");
    const apps = $("a");
    //console.log(apps.length);
    const res = [];
    for (var i = 0; i < apps.length; i++) {
      let href = $(apps[i]).attr("href");
      if (href.includes("id=")) {
        href = href.split("id=");
        res.push(href[href.length - 1]);
      }
    }
    fs.writeFile(
      `./appId-${category}.json`,
      JSON.stringify(res),
      function (err) {
        if (err) console.log(err);
        else {
          console.log("Done");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

getData("TOOLS");
