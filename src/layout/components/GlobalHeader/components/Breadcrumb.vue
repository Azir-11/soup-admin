<template>
  <div>
    <n-breadcrumb v-if="breadcrumbList.length != 0">
      <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
        <n-breadcrumb-item v-if="routeItem.meta?.title">
          <n-dropdown
            v-if="routeItem.children.length"
            :options="routeItem.children"
            @select="dropdownSelect"
          >
            <span class="link-text">
              {{ routeItem.meta?.title }}
            </span>
          </n-dropdown>
          <span v-else class="link-text">
            {{ routeItem.meta?.title }}
          </span>
        </n-breadcrumb-item>
      </template>
    </n-breadcrumb>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

/**
 * 面包屑导航
 */
const generator: any = (routerMap) => {
  return routerMap.map((item) => {
    // 如果为隐藏菜单，则返回空
    if (item?.meta?.hideBreadcrumb) {
      return [];
    }
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === "/",
    };
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generator(item.children, currentMenu);
    }
    return currentMenu;
  });
};

const breadcrumbList = computed(() => {
  return generator(route.matched);
});

const dropdownSelect = (key) => {
  router.push({ name: key });
};
</script>
