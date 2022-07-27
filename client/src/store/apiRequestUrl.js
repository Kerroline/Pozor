import { HOST_API_URL, ROLE_ADMIN_ID } from "@/store";

class ApiRequestUrl {
  buildRequestUrl(link) {
    return `${HOST_API_URL}/${link}`;
  }

  get(link, cookies, auth) {
    let init = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    };

    if (auth) {
      init.headers.Authorization = "Bearer " + cookies.get("jwt");
    }

    return fetch(this.buildRequestUrl(link), init);
  }

  post(link, data) {
    let init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: data,
    };

    return fetch(this.buildRequestUrl(link), init);
  }
}

const apiRequest = new ApiRequestUrl();
export default apiRequest;