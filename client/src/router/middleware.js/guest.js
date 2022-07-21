export default function guest({ next, store }) {
  if (store.getters["auth/isAuth"]) {
    return next({
      name: "main-page",
    });
  }

  return next();
}
