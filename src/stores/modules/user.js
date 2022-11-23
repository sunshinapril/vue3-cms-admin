import { defineStore } from "pinia";

const useUser = defineStore({
  id: "user-pinia",
  state: () => ({
    isCollapse: false,
    userInfo: null,
  }),
  getters: {
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    setIsCollapse(data) {
      this.isCollapse = data;
    },
    setUserInfo(info) {
      this.userInfo = info;
    },
  },
});

export default useUser;
