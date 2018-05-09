import Odometer from './Odometer';
import {connect} from 'dva';

export default function flask(divID, result, obj) {
  var nameStyle = obj.style.name;
  var prefixStyle = obj.style.prefix;
  var suffixStyle = obj.style.suffix;
  var valueStyle = obj.style.value;
  var dValue = 8235;
  var tt = document.getElementById(divID);
  while (tt.hasChildNodes()) //当div下还存在子节点时
  {
    tt.removeChild(tt.firstChild);
  }
  for (var i = 0; i < 4; i++) {
    var div = document.createElement('div');
    var divattr = document.createAttribute("id");
    divattr.value = "test" + i;
    div.setAttributeNode(divattr);
    var style = document.createAttribute("style");
    div.setAttributeNode(style);
    tt.appendChild(div);
  }

  var title = document.createTextNode(obj.Name);
  var test0 = document.getElementById('test0');
  test0.style.width = "220px";
  test0.style.height = "50px";
  test0.style.marginTop = "0px";
  test0.style.marginLeft = "20px";
  test0.style.fontSize = nameStyle.fontsize + "px";
  test0.style.fontFamily = nameStyle.fontfamily;
  test0.style.color = nameStyle.fontcolor;
  test0.style.display = "block";
  test0.appendChild(title);





  var test2 = document.getElementById('test2');
  test2.style.width = '40%';
  test2.style.minWidth = '140px';
  test2.style.height = "40px";
  test2.style.lineHeight = "40px";
  test2.style.float = "left";
  test2.style.textAlign = "center";
  test2.style.color = valueStyle.fontcolor;
  var fontcolor = obj.style.value.fontcolor;
  var fontsize = obj.style.value.fontsize;
  var fontfamily = obj.style.value.fontfamily;
  var odo1 = new Odometer("#test2", {
    num: "", //初始化值
    speed: 1000, //动画速度
    symbol: '', //分割符
    dot: 0, //保留几位小数点
  });
  odo1.update(dValue);  //更新数字

  var numText = document.querySelectorAll('.number-animate-span');
  for (var i = 0; i < numText.length; i++) {
    numText[i].style.color = fontcolor;
    numText[i].style.fontSize = fontsize + "px";
    numText[i].style.fontFamily = fontfamily;
  }

  var prefix = document.createTextNode(prefixStyle.text);
  var test1 = document.getElementById('test1');
  test1.style.width = "30px";
  test1.style.height = "50px";
  test1.style.lineHeight = "50px";
  test1.style.marginTop = "5px";
  test1.style.marginLeft = "5px";
  test1.style.fontSize = prefixStyle.fontsize + "px";
  test1.style.color = prefixStyle.fontcolor;
  test1.style.fontFamily = prefixStyle.fontfamily;
  test1.style.display = "inline";
  test1.style.float = "left";

  test1.appendChild(prefix);

  //右侧文字
  var suffix = document.createTextNode(suffixStyle.text);
  var test3 = document.getElementById('test3');
  test3.style.width = "30px";
  test3.style.height = "50px";
  test3.style.lineHeight = "50px";
  test3.style.marginTop = "5px";
  test3.style.marginLeft = "5px";
  test3.style.fontSize = suffixStyle.fontsize + "px";
  test3.style.color = suffixStyle.fontcolor;
  test3.style.fontFamily = suffixStyle.fontfamily;
  test3.style.display = "inline";
  test3.style.float = "left";
  test3.style.wordWrap = "break-word";
  test3.style.textAlign = "left";

  test3.appendChild(suffix);
}
