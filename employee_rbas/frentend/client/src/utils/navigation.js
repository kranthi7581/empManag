export const getCurrentPath = () => window.location.pathname || "/";

export const navigateTo = (path) => {
  if (path === getCurrentPath()) {
    return;
  }

  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("app:navigate"));
};
