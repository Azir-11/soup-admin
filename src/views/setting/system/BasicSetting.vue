<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
        <n-form-item label="网站名称" path="name">
          <n-input v-model:value="formValue.name" placeholder="请输入网站名称" />
        </n-form-item>

        <n-form-item label="备案编号" path="icpCode">
          <n-input v-model:value="formValue.icpCode" placeholder="请输入备案编号" />
        </n-form-item>

        <n-form-item label="联系电话" path="mobile">
          <n-input v-model:value="formValue.mobile" placeholder="请输入联系电话" />
        </n-form-item>

        <n-form-item label="联系地址" path="address">
          <n-input v-model:value="formValue.address" type="textarea" placeholder="请输入联系地址" />
        </n-form-item>

        <n-form-item label="登录验证码" path="loginCode">
          <n-radio-group v-model:value="formValue.loginCode" name="loginCode">
            <n-space>
              <n-radio :value="1">开启</n-radio>
              <n-radio :value="0">关闭</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="网站开启访问" path="systemOpen">
          <n-switch
            v-model:value="formValue.systemOpen"
            size="large"
            @update:value="systemOpenChange"
          />
        </n-form-item>

        <n-form-item label="网站关闭提示" path="closeText">
          <n-input
            v-model:value="formValue.closeText"
            type="textarea"
            placeholder="请输入网站关闭提示"
          />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新基本信息</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useDialog, useMessage } from "naive-ui";

const rules = {
  name: {
    required: true,
    message: "请输入网站名称",
    trigger: "blur",
  },
  mobile: {
    required: true,
    message: "请输入联系电话",
    trigger: "input",
  },
};

export default defineComponent({
  setup() {
    const formRef: any = ref(null);
    const message = useMessage();
    const dialog = useDialog();

    const state = reactive({
      formValue: {
        name: "",
        mobile: "",
        icpCode: "",
        address: "",
        loginCode: 0,
        closeText:
          "网站维护中，暂时无法访问！本网站正在进行系统维护和技术升级，网站暂时无法访问，敬请谅解！",
        systemOpen: true,
      },
    });

    function systemOpenChange(value) {
      if (!value) {
        dialog.warning({
          title: "提示",
          content: "您确定要关闭系统访问吗？该操作立马生效，请慎重操作！",
          positiveText: "确定",
          negativeText: "取消",
          onPositiveClick: () => {
            message.success("操作成功");
          },
          onNegativeClick: () => {
            state.formValue.systemOpen = true;
          },
        });
      }
    }

    function formSubmit() {
      formRef.value.validate((errors) => {
        if (!errors) {
          message.success("验证成功");
        } else {
          message.error("验证失败，请填写完整信息");
        }
      });
    }

    function resetForm() {
      formRef.value.restoreValidation();
    }

    return {
      formRef,
      ...toRefs(state),
      rules,
      formSubmit,
      resetForm,
      systemOpenChange,
    };
  },
});
</script>

<style scoped>
#anime_box {
  position: relative;
  left: 50%;
  top: 100px;
  width: 100px;
  height: 100px;
  transform: translateX(-50px);
  background-color: white;
}
#anime_point_1,
#anime_point_2,
#anime_point_3,
#anime_point_4 {
  position: absolute;
}
#anime_point_1 {
  left: 0;
  top: 0;
  background-color: blue;
  animation: anime_point_1 2s infinite;
}
#anime_point_2 {
  right: 0;
  bottom: 0;
  background-color: red;
  animation: anime_point_2 2s infinite;
}
#anime_point_3 {
  left: 20px;
  top: -20px;
  width: 2px;
  height: 140px;
  background-color: black;
  animation: anime_point_3 2s infinite;
}
#anime_point_4 {
  left: -20px;
  top: 20px;
  width: 140px;
  height: 2px;
  background-color: black;
  animation: anime_point_4 2s infinite;
}
@keyframes anime_point_1 {
  0% {
    width: 20px;
    height: 20px;
  }
  25% {
    width: 80px;
    height: 20px;
  }
  50% {
    width: 80px;
    height: 80px;
  }
  75% {
    width: 20px;
    height: 80px;
  }
  100% {
    width: 20px;
    height: 20px;
  }
}
@keyframes anime_point_2 {
  0% {
    width: 80px;
    height: 80px;
  }
  25% {
    width: 20px;
    height: 80px;
  }
  50% {
    width: 20px;
    height: 20px;
  }
  75% {
    width: 80px;
    height: 20px;
  }
  100% {
    width: 80px;
    height: 80px;
  }
}
@keyframes anime_point_3 {
  0% {
    left: 20px;
  }
  25% {
    left: 80px;
  }
  50% {
    left: 80px;
  }
  75% {
    left: 20px;
  }
  100% {
    left: 20px;
  }
}
@keyframes anime_point_4 {
  0% {
    top: 20px;
  }
  25% {
    top: 20px;
  }
  50% {
    top: 80px;
  }
  75% {
    top: 80px;
  }
  100% {
    top: 20px;
  }
}
</style>
