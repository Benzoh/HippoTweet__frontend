export const inputCount = function (str, encode) {
  let count = 0;
  let setEncode = 'Shift_JIS';
  let c = '';

  if (encode && encode !== '') {
    if (encode.match(/^(SJIS|Shift[_\-]JIS)$/i)) {
      setEncode = 'Shift_JIS';
    } else if (encode.match(/^(UTF-?8)$/i)) {
      setEncode = 'UTF-8';
    }
  }

  for (let i = 0, len = str.length; i < len; i++) {
    c = str.charCodeAt(i);
    if (setEncode === 'UTF-8') {
      if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
        count += 1;
      } else {
        count += 2;
      }
    } else if (setEncode === 'Shift_JIS') {
      if ((c >= 0x0 && c < 0x81) || (c == 0xa0) || (c >= 0xa1 && c < 0xdf) || (c >= 0xfd && c < 0xff)) {
        count += 1;
      } else {
        count += 2;
      }
    }
  }
  // console.log({ count });
  return count;
};
