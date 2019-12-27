import { EXIF } from 'exif-js';

// canvas To file
export const canvasResizetoFile = (canvas, quality = 0.8, fn) => {
  canvas.toBlob(
    function(blob) {
      fn(blob);
    },
    'image/jpeg',
    quality,
  );
};

export const compressImage = (file, fn) => {
  // 旋转角度
  let orientation = null;
  // 通过 EXIF 获取旋转角度 1 为正常  3 为 180°  6 顺时针90°  9 为 逆时针90°
  EXIF.getData(file, function() {
    orientation = EXIF.getTag(this, 'Orientation');
  });

  // 压缩图片需要的一些元素和对象
  let img = new Image();
  // 缩放图片需要的canvas
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');

  // base64地址图片加载完毕后
  img.onload = function() {
    // 图片原始尺寸
    let originWidth = this.width;
    let originHeight = this.height;

    //大小/比例压缩
    let rate = 0.4;
    let maxWidth = 800;
    let maxHeight = 800;

    // 图片大小>=2MB
    let isCompress = file.size >= 2097152;
    let targetWidth = isCompress ? originWidth * rate : originWidth;
    let targetHeight = isCompress ? originHeight * rate : originHeight;

    // 图片尺寸超过大小的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);

    // 图片压缩,旋转需矫正
    if (orientation && +orientation !== 1) {
      switch (+orientation) {
        case 6: // 旋转90度
          canvas.width = targetHeight;
          canvas.height = targetWidth;
          context.rotate(Math.PI / 2);
          // 图片渲染
          context.drawImage(img, 0, -targetHeight, targetWidth, targetHeight);
          break;
        case 3: // 旋转180度
          context.rotate(Math.PI);
          // 图片渲染
          context.drawImage(img, -targetWidth, -targetHeight, targetWidth, targetHeight);
          break;
        case 8: // 旋转-90度
          canvas.width = targetHeight;
          canvas.height = targetWidth;
          context.rotate((3 * Math.PI) / 2);
          // 图片渲染
          context.drawImage(img, -targetWidth, 0, targetWidth, targetHeight);
          break;
      }
    } else {
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
    }

    // canvas转为blob并上传
    canvasResizetoFile(canvas, 0.8, blob => {
      if (file.name) {
        blob.name = file.name;
        blob.lastModifiedDate = file.lastModifiedDate;
        blob.lastModified = file.lastModified;
      }
      let pic = {
        // content: canvas.toDataURL("image/jpeg", 0.8),
        getContent: function(cb) {
          return filetoDataURL(this.blob, dataUrl => {
            if (cb) cb(dataUrl);
          });
        },
        blob,
      };
      //   vm.TAKE_PICTURE(pic);
      //   vm.$router.push("/face");
      if (fn) fn(pic);
    });
  };

  // 文件base64化，以便获知图片原始尺寸
  filetoDataURL(file, dataUrl => {
    img.src = dataUrl;
  });
};

export function filetoDataURL(file, fn) {
  var reader = new FileReader();
  reader.onloadend = function(e) {
    fn(e.target.result);
  };
  reader.readAsDataURL(file);
}
