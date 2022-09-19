interface UserModel {
  token: string;
  id: string;
  userName: string;
  role: string;
  //   模拟后端返回的JSON形式的数组
  permissions: string;
  password: string;
}

export const userModel: UserModel[] = [
  {
    token: "__TOKEN_SOUP_SUPER__",
    id: "0",
    userName: "Soup_super",
    role: "super",
    permissions: `["test"]`,
    password: "super",
  },
  {
    token: "__TOKEN_SOUP_ADMIN__",
    id: "1",
    userName: "Soup_Admin",
    role: "admin",
    permissions: "[]",
    password: "admin123",
  },
  {
    token: "__TOKEN_SOUP_USER__",
    id: "2",
    userName: "Soup_User",
    role: "user",
    permissions: "[]",
    password: "user114514",
  },
];
