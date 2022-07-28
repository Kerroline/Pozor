import apiRequestUrl from "@/store/apiRequestUrl";
class Request {
  loginUser(data) {
    return apiRequestUrl.post("/sign-in", data);
  }
  logoutUser(cookie, auth) {
    return apiRequestUrl.get("/logout", cookie, auth);
  }
  getUser(cookie, auth) {
    return apiRequestUrl.get("/getUser", cookie, auth);
  }
}

const request = new Request();

export default request;
