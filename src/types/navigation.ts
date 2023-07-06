export type NavigationItems =
  | "home"
  | "account"
  | "dinner-of-the-day"
  | "upload";

export type NavigationItem = {
  name: string;
  value: NavigationItems;
};
