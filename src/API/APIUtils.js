import { API_BASE_URL, ACCESS_TOKEN } from "./constants";

class ApiUtils {
  request = options => {
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
      headers.append(
        "Authorization",
        "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      );
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options).then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
  };

  login(loginRequest) {
    return this.request({
      url: API_BASE_URL + "/authenticate",
      method: "POST",
      body: JSON.stringify(loginRequest)
    });
  }

  signup(signupRequest) {
    return this.request({
      url: API_BASE_URL + "/register",
      method: "POST",
      body: JSON.stringify(signupRequest)
    });
  }

  getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set."); // if there is no access token // means there is no user
    }

    return this.request({
      url: API_BASE_URL + "/LenderInfo",
      method: "GET"
    });
  }

  showLoans(id) {
    // to get All Loans of the current Lender
    return this.request({
      url: API_BASE_URL + "/showLenderLoans?LenderId=" + id,
      method: "GET"
    });
  }

  saveLoan(loan) {
    return this.request({
      url: API_BASE_URL + "/createLoan",
      method: "POST",
      body: JSON.stringify(loan)
    });
  }

  updateLender(lenderRequest) {
    return this.request({
      url: API_BASE_URL + "/updateTotalInterest",
      method: "POST",
      body: JSON.stringify(lenderRequest)
    });
  }

  Logout() {
    localStorage.removeItem(ACCESS_TOKEN);
  }
}

export default ApiUtils;
