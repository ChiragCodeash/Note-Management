import { Workbox } from "workbox-window";

export function register() {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js");

    wb.addEventListener("activated", (event) => {
      if (!event.isUpdate) {
        console.log("Service worker activated for the first time!");
      } else {
        console.log("Service worker activated with updates!");
      }
    });

    wb.register()
      .then((registration) => {
        console.log("Service worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
      });
  }
}
