<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="login-form-wrap">
        <div class="login-logo"></div>
        <el-form ref="loginFormRef" :label-position="'top'" :hide-required-asterisk="true" :model="loginForm" :rules="loginRules" class="login-form">
          <div class="title-container">
            <div class="title-text">{{ VITE_APP_TITLE }}</div>
            <div class="tips">欢迎登录！</div>
          </div>
          <el-form-item prop="username" label="用户名">
              <el-input
                v-model="loginForm.username"
                type="text"
                auto-complete="off"
                style="height: 50px;"
                placeholder="请输入用户名">
                <template #prefix>
                  <svg-icon
                  name="user1"
                  class="input-icon" />
                </template>
                
              </el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="请输入密码"
                style="height: 50px;"
                @keyup.enter.native="handleLogin">
                <template #prefix>
                  <svg-icon
                  name="password1"
                  class="input-icon" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox class="rememberMe" v-model="loginForm.rememberMe">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                class="login-btn"
                @click.native.prevent="handleLogin">
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>

    <!--  底部  -->
    <div class="login-footer">
      Copyright © 2021-2025 XXX All Rights Reserved.
    </div>
  </div>
</template>
<script setup>
import {ref, computed} from 'vue';
import Cookies from 'js-cookie';
import {useRoute, useRouter} from 'vue-router';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import useUser from '@/stores/modules/user';
const loading = ref(false);
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE;
const loginFormRef = ref();
const route = useRoute();
const router = useRouter();
const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false
});
const loginRules = ref({
  username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
  password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
  code: [{ required: true, trigger: 'change', message: '验证码不能为空' }],
});
const redirect = computed(() => route.query && route.query.redirect || '/');
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      if (loginForm.value.rememberMe) {
        Cookies.set('username', loginForm.value.username, { expires: 30 })
        Cookies.set('password', encrypt(loginForm.value.password), {
          expires: 30,
        })
        Cookies.set('rememberMe', loginForm.value.rememberMe, {
          expires: 30,
        })
      } else {
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
      }
      useUser().Login(loginForm.value).then(() => {
        loading.value = false;
        router.push(redirect.value);
      }).
      catch(() => {
        loading.value = false;
      })
    }
  })
};

</script>
<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('@/assets/images/login/login-bg.png');
  background-size: cover;
  .login-wrap {
    position: relative;
    width: 1080px;
    height: 640px;
    overflow: hidden;
    .login-form-wrap {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      border-radius: 20px;
      background: #ffffff;
      .login-logo {
        width: 620px;
        height: 640px;
        background: url('@/assets/images/login/login-logo.png') no-repeat center center;
        background-size: cover;
      }
      .login-form {
        width: 470px;
        padding: 50px;
        :deep(.el-form-item) {
          .el-input__inner {
            font-size: 16px;
          }
          .el-form-item__label {
            padding-bottom: 5px;
            color: #55546F;
            line-height: 20px;
            font-size: 14px;
            font-weight: 600;
          }
        }
        .title-container {
          margin-bottom: 30px;
          .title-text {
            font-size: 38px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #111316;
            line-height: 53px;
          }
          .tips {
            margin-top: 2px;
            font-size: 24px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #111316;
            line-height: 32px;
            letter-spacing: 1px;
          }
        }
        .rememberMe {
          :deep(.el-checkbox__input) {
            &.is-checked .el-checkbox__inner{
              background-color: #3A77FE;
            }
          }
         
          :deep(.el-checkbox__label){
            padding-left: 6px;
            font-size: 16px;
            color: #111316;
          }
        }
        .login-btn {
          width: 100%;
          height: 50px;
          background: #3A77FE;
          color: #ffffff;
          border-radius: 8px;
          font-size: 18px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
        }
        :deep(.el-input) {
          .el-input__inner {
            height: 50px;
            line-height: 50px;
          }
          .el-input__prefix {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &::after {
              content: '';
              width: 1px;
              height: 20px;
              background-color: #CFD0E1;
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
        .desc {
          text-align: center;
          color: #aaa;
          font-size: 12px;
          margin-bottom: 50px;
        }
        .input-icon {
          width: 20px;
          height: 20px;
          color: #111316;
          line-height: 50px;
          margin-left: 12px;
          margin-right: 9px;
        }
      }
    }
  }
  .login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
    z-index: 90;
    color: #fff;
  }
}
</style>