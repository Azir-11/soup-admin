interface UserModel {
  token: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  password: string;
}

export const userModel: UserModel[] = [
  {
    token: "__TOKEN_SOUP_SUPER__",
    userId: "0",
    userName: "Soup_super",
    userAvatar: "/icon/ms-icon-310x310.png",
    userRole: "super",
    password: "super",
  },
  {
    token: "__TOKEN_SOUP_ADMIN__",
    userId: "1",
    userName: "Soup_Admin",
    userAvatar: "/icon/ms-icon-310x310.png",
    userRole: "admin",
    password: "admin123",
  },
  {
    token: "__TOKEN_SOUP_USER__",
    userId: "2",
    userName: "Soup_User",
    userAvatar: "/icon/ms-icon-310x310.png",
    userRole: "user",
    password: "user114514",
  },
];
