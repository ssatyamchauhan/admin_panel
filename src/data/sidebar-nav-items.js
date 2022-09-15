import { getFromLocalStorage } from "../lib/helper";

export default function () {

  const role = getFromLocalStorage("role");

  let adminPanel = []
  if (role === 'Admin') {
    adminPanel = [
      {
        title: "Users",
        htmlBefore: '<i class="material-icons">vertical_split</i>',
        to: "/users",
      },
      {
        title: "Category",
        htmlBefore: '<i class="material-icons">vertical_split</i>',
        to: "/category",
      },
      {
        title: "News",
        htmlBefore: '<i class="material-icons">vertical_split</i>',
        to: "/news",
      },
      {
        title: "Notification",
        htmlBefore: '<i class="material-icons">vertical_split</i>',
        to: "/notification",
      }
    ]
  }
  return [
  ].concat(adminPanel);
}
