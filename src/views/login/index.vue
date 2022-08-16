<template>
  <div class="h-screen overflow-hidden">
    <img
      class="absolute z-0 block h-screen w-screen select-none"
      src="../../assets/images/login.svg"
    />
    <div class="flex flex-col justify-center items-center h-screen z-10">
      <div class="text-center">
        <n-h1>-soupAdmin-</n-h1>
        <n-h2>中后台模板</n-h2>
      </div>
      <div class="w-3/4 sm:w-3/4 md:w-1/2 lg:w-2/4 xl:w-2/5 2xl:w-2/5">
        <n-form
          ref="formRef"
          :model="formInline"
          :rules="rules"
          label-placement="left"
          size="large"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" clearable placeholder="请输入用户名">
              <template #prefix>
                <n-icon color="#808695" size="18">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
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
          <!--          验证model框-->
          <n-modal
            v-model:show="showModal"
            :on-after-leave="modelClose"
            preset="dialog"
            title="Dialog"
          >
            <template #header>
              <div>验证</div>
            </template>
            <slide-verify
              :accuracy="accuracy"
              :slider-text="verifyText"
              style="margin: 0 auto"
              @again="verifyAgain"
              @success="verifySuccess"
            ></slide-verify>
          </n-modal>
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
            <div class="flex justify-between w-full">
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
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Glasses,
  GlassesOutline,
  PersonOutline,
  LogoGithub,
  LogoFacebook,
} from "@vicons/ionicons5";
import { PageEnum } from "@/enums/pageEnum";
import { login } from "@/axios/api";
//图形验证码
import SlideVerify from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";
import type { Login } from "@/axios/api/types";
import { ACCESS_TOKEN, CURRENT_USER } from "@/stores/mutation-types";
import { storage } from "@/utils/storage";

const formRef = ref();
const message = window["$message"];
const loading = ref(false);
const autoLogin = ref(false);
const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

const formInline = reactive({
  username: "",
  password: "",
  isCaptcha: false,
});

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};

const router = useRouter();
const route = useRoute();

// 提示文字
let verifyText = ref("请滑动滑块至正确位置");
// 灵敏程度
const accuracy = ref(1);
//验证的model框
let showModal = ref(false);

//model关闭回调
const modelClose = () => {
  loading.value = false;
};

/**
 * 检测是否机器操作
 * @return 刷新验证码
 */
const verifyAgain = () => {
  message.error("检测到非人为操作的哦！ try again");
  accuracy.value = 10;
};

/**
 * 验证成功,关闭model框，再次点击登录时调用登录接口
 * @return 关闭model框，修改验证状态为通过
 */
const verifySuccess = () => {
  message.success("验证通过!");
  setTimeout(() => {
    formInline.isCaptcha = true;
    showModal.value = false;
  }, 400);
};

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
      // TODO
      //如果没通过验证码，则打开model,图片暂有问题，后面再加
      // if (formInline.isCaptcha === false) {
      //   showModal.value = true;
      //   return;
      // }
      storage.set(CURRENT_USER, { userName: "admin" });
      storage.set(ACCESS_TOKEN, { value: "token" });
      message.success("登录成功，即将进入系统");
      handleSuccess();
      loading.value = false;
      return;
    }
  });
};

/**
 * 登录成功后跳转
 */
const handleSuccess = () => {
  const toPath = decodeURIComponent((route.query?.redirect || "/") as string);
  if (route.name === LOGIN_NAME) {
    router.replace("/");
  } else {
    router.replace(toPath);
  }
};
</script>
