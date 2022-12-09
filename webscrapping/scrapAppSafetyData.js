import axios from "axios";
import { load } from "cheerio";
import fs from "fs";

const extractCategory = async (id) => {
  try {
    const { data } = await axios.get(
      `https://play.google.com/store/apps/details?id=${id}&hl=en&gl=US`
    );
    const $ = load(data);
    const appCategoryBar = $(".Uc6QCc");
    const appCategoryBarList = $(appCategoryBar).find(".VfPpkd-vQzf8d");
    const appCategory = $(
      appCategoryBarList[appCategoryBarList.length - 1]
    ).text();
    return appCategory;
  } catch (error) {
    console.log(error);
  }
};

const getSafetyData = async (id, category) => {
  try {
    const { data } = await axios.get(
      `https://play.google.com/store/apps/datasafety?id=${id}&hl=en&gl=US`
    );
    const $ = load(data);
    const appName = $(".ylijCc").text();
    const permissionReason = $(".Mf2Txd");
    const numberOfPermissionShared = $(permissionReason[0]).find(
      ".pcmFvf"
    ).length;
    const permission = $(".pcmFvf");
    const permissionPurpose = $(".FnWDne");
    let res = {
      companyName: appName,
      companyCategory: category,
      dataShared: {},
      dataCollected: {},
    };
    var count = 0;
    for (var i = 0; i < permission.length; i++) {
      let obj = {
        permission: $(permission[i]).text(),
        permissionPurpose: $(permissionPurpose[i]).text().split(", "),
      };
      if (obj.permissionPurpose.indexOf("Fraud prevention") != -1) {
        let temp = [];
        for (var j = 0; j < obj.permissionPurpose.length; j++) {
          if (
            obj.permissionPurpose[j] != "Fraud prevention" &&
            obj.permissionPurpose[j] != "security" &&
            obj.permissionPurpose[j] != "and compliance"
          ) {
            temp.push(obj.permissionPurpose[j]);
          }
        }
        temp.push("Fraud prevention, security, and compliance");
        obj.permissionPurpose = temp;
      }
      if (count < numberOfPermissionShared) {
        res.dataShared[obj.permission] = obj.permissionPurpose;
        count++;
      } else res.dataCollected[obj.permission] = obj.permissionPurpose;
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getIDs = async (category) => {
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
    return res;
  } catch (error) {
    console.log(error);
  }
};

const categories = [
  "Art_and_Design",
  "Auto_and_Vehicles",
  "Beauty",
  "Books_and_Reference",
  "Business",
  "Comics",
  "Communication",
  "Dating",
  "Education",
  "Entertainment",
  "Events",
  "Finance",
  "Food_and_Drink",
  "Health_and_Fitness",
  "House_and_Home",
  "Libraries_and_Demo",
  "Lifestyle",
  "Maps_and_Navigation",
  "Medical",
  "Music_and_Audio",
  "News_and_Magazines",
  "Parenting",
  "Personalization",
  "Photography",
  "Productivity",
  "Shopping",
  "Social",
  "Sports",
  "Tools",
  "Travel_and_Local",
  "VIDEO_PLAYERS",
  "Weather",
  "GAME_Action",
  "GAME_Adventure",
  "GAME_Arcade",
  "GAME_Board",
  "GAME_Card",
  "GAME_Casino",
  "GAME_Casual",
  "GAME_Educational",
  "GAME_Music",
  "GAME_Puzzle",
  "GAME_Racing",
  "GAME_ROLE_PLAYING",
  "GAME_Simulation",
  "GAME_Sports",
  "GAME_Strategy",
  "GAME_Trivia",
  "GAME_Word",
];

const getData = async () => {
  let res = [];
  let count = 0;

  for (var i = 0; i < categories.length; i++) {
    const category = categories[i].toUpperCase();
    console.log(category);
    const ids = await getIDs(category);
    for (var j = 0; j < ids.length; j++) {
      count++;
      res.push(await getSafetyData(ids[j], category));
    }
  }

  fs.writeFile(`./safetyData.json`, JSON.stringify(res), function (err) {
    if (err) console.log(err);
    else {
      console.log(count);
      console.log("Done");
    }
  });
};

getData();
