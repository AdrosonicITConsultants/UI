import i18next from "i18next";

export default function changeLang(lang) {
  i18next.changeLanguage(lang).then(() => {
    i18next.options.lng = lang;
  });
};


