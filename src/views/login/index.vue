<template>
  <div class="h-screen overflow-hidden">
    <img
      class="absolute z-0 block h-screen w-screen select-none"
      src="../../assets/images/login.svg"
    />
    <div class="z-10 flex h-screen flex-col items-center justify-center">
      <div class="text-center">
        <n-h1>-soupAdmin-</n-h1>
        <n-h2>中后台模板</n-h2>
      </div>
      <div class="w-3/4 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/5 2xl:w-2/5">
        <n-form ref="formRef" :model="loginForm" :rules="rules" label-placement="left" size="large">
          <n-form-item path="userName">
            <n-input v-model:value="loginForm.userName" clearable placeholder="请输入用户名">
              <template #prefix>
                <n-icon color="#808695" size="18">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="loginForm.password"
              show-password-on="click"
              clearable
              placeholder="请输入密码"
              type="password"
            >
              <template #password-visible-icon>
                <n-icon :component="GlassesOutline" :size="16" />
              </template>
              <template #password-invisible-icon>
                <n-icon :component="Glasses" :size="16" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <div class="flex w-full justify-between">
              <div>
                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
              </div>
              <div>
                <n-button text>注册账号</n-button>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button :loading="loading" block size="large" type="primary" @click="handleSubmit">
              登录
            </n-button>
          </n-form-item>
          <n-form-item class="default-color justify-between">
            <div class="flex w-full justify-between">
              <div class="flex">
                <span class="cursor-default">其它登录方式</span>
                <a class="cursor-pointer pl-2">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoGithub />
                  </n-icon>
                </a>
                <a class="cursor-pointer pl-2">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoFacebook />
                  </n-icon>
                </a>
              </div>
              <a class="text-green-600 no-underline" href="javascript:">注册账号</a>
            </div>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Glasses,
  GlassesOutline,
  PersonOutline,
  LogoGithub,
  LogoFacebook,
} from "@vicons/ionicons5";
import { PageEnum } from "@/enum/pageEnum";
import { useAuthStore } from "@/stores";

const formRef = ref();
const message = window["$message"];
const loading = ref(false);
const autoLogin = ref(false);
const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

const loginForm = reactive({
  userName: "",
  password: "",
  isCaptcha: false,
});

const rules = {
  userName: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};

const router = useRouter();
const route = useRoute();

/**
 * 监听自动登录按钮的状态,暂停自动登录功能的执行
 * @param val 是否自动登录
 */
watch(autoLogin, (val) => {
  if (val) {
    message.error("检测到环境不安全，自动登录功能暂停开放");
    setTimeout(() => {
      autoLogin.value = false;
    }, 200);
  }
});

const authStore = useAuthStore();

/**
 * 第一次点击时打开验证码model，验证通过时调用登录接口
 * @param e 阻止默认事件传递
 */
const handleSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  if (loading.value) {
    message.warning("请勿重复点击");
    return;
  }
  //校验表单是否填写
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      loading.value = true;

      authStore
        .login(loginForm.userName, loginForm.password)
        .then(() => {
          message.success("登录成功，即将进入系统");
        })
        .catch((err) => {
          message.warning(err.message);
        });

      loading.value = false;
      return;
    }
  });
};
</script>
