class DownLoadImg {
  convertImgToBase64(obj, callback, outputFormat) {
    const { url } = obj;
    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d"),
      img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      if (canvas) {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL(outputFormat || "image/png");
        callback.call(this, dataURL);
        canvas = null;
      }
    };
    img.src = url;
  }
  downloadFile(fileName, content) {
    const aLink = document.createElement("a");
    const blob = this.base64ToBlob(content); //new Blob([content]);

    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);

    // aLink.dispatchEvent(evt);
    aLink.click();
  }
  base64ToBlob(code) {
    const parts = code.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }
}
export default new DownLoadImg();
