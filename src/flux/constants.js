export default {
  IMAGE_URL: "https://inproapi.tracenow.in/assets",
  CHANGE: "CHANGE",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  IS_AUTHENTICATED: 'IS_AUTHENTICATED',
  SUCCESS_MESSAGE: "DATA FOUND SUCCESSFULLY!",
  SUCCESS_CREATE: "USER CREATED SUCCESSFULLY!",
  SUCCESS_UPDATE: "UPDATED SUCCESSFULLY!",
  NO_DATA: "NO DATA FOUND",
  ERROR_LOGIN: "YOUR USERNAME OR PASSWORD IS INVAID",
  MANADATORY: "ALL FIELDS ARE MANADATORY!",
  INTERNAL_ERROR: "SOMETHING WENT WRONG",
  EMPTY_SEARCH_ERROR: "ENTER SOMETHING TO SEARCH",
  SEARCH_COLUMNS: [
    {
      name: "Name", selector: "cname", width: "250px", wrap: true, link: false
    },
    { name: "Father Name", selector: "fname", width: "150px", wrap: true, link: false },

    { name: "Mobile No.", selector: "mobile", width: "150px", wrap: true, link: true },
    { name: "Alternate No", selector: "altno", width: "150px", wrap: true, link: true },
    { name: "Aadhar No", selector: "adr", width: "150px", wrap: true, link: true },

    { name: "Email", selector: "email", width: "150px", wrap: true, link: true },

    { name: "DOB", selector: "dob", width: "100px", wrap: true, link: false },

    { name: "Address", selector: "ladd", width: "400px", height: "400px", wrap: true, link: false },
    { name: "Permanent Address", selector: "padd", width: "400px", height: "400px", wrap: true, link: false },
    { name: "DOA", selector: "doa", width: "200px", wrap: true, link: false },
    { name: "companyName", selector: "companyName", width: "150px", wrap: true, link: false },
  ],
};
