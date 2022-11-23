/**
 * 检测图片是否存在
 * @param url
 */
const imageIsExist = function (url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = function () {
      if (this.complete) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = function () {
      resolve(false);
      img = null;
    };
    img.src = url;
  });
};
//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
export const realImage = async (el, binding) => {
  const imgURL = binding.value; //获取图片地址
  if (imgURL) {
    const exist = await imageIsExist(imgURL);
    if (exist) {
      el.setAttribute("src", imgURL);
    }
  }
};
