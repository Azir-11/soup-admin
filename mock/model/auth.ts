interface UserModel {
  token: string;
  userId: string;
  userName: string;
  avatar: string;
  userRole: string;
  //   模拟后端返回的JSON形式的数组
  permissions: string;
  password: string;
}

export const userModel: UserModel[] = [
  {
    token: "__TOKEN_SOUP_SUPER__",
    userId: "0",
    userName: "Soup_super",
    avatar: "/icon/ms-icon-310x310.png",
    userRole: "super",
    permissions: `["test"]`,
    password: "super",
  },
  {
    token: "__TOKEN_SOUP_ADMIN__",
    userId: "1",
    userName: "Soup_Admin",
    avatar: "/icon/ms-icon-310x310.png",
    userRole: "admin",
    permissions: "[]",
    password: "admin123",
  },
  {
    token: "__TOKEN_SOUP_USER__",
    userId: "2",
    userName: "Soup_User",
    avatar: "/icon/ms-icon-310x310.png",
    userRole: "user",
    permissions: "[]",
    password: "user114514",
  },
];
