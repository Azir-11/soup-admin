import { useAppStore } from "../modules";

/** 订阅app store */
export default function subscribeAppStore() {
  const app = useAppStore();

  const watchWidth = () => {
    const bodyWidth = document.body.clientWidth;
    // 当宽度小于640的时候关闭菜单，改为显示菜单抽屉
    if (bodyWidth <= 640) {
      app.toggleMobile(true);
      return;
    } else {
      // 如果从移动端切换到PC端，则将drawer隐藏
      if (app.isMobile) {
        app.setMenuDrawerVisible(false);
      }
      app.toggleMobile(false);
    }
    // 当宽度小于950的时候主动收缩菜单
    if (bodyWidth <= 950) {
      app.setSiderCollapse(true);
    } else {
      app.setSiderCollapse(false);
    }
  };

  onMounted(() => {
    watchWidth();
    window.addEventListener("resize", watchWidth);
  });
}
