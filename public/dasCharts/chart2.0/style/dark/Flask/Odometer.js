export default class Odometer {
  constructor(x, y) {
    this.setting = {
      speed: 1000,//动画速度
      num: "", //初始化值
      symbol: '',//默认的分割符号，千，万，千万
      dot: 0,//保留几位小数点
      zero: true
    }
    this.$parent = document.querySelector(x);
    this.html = `<div class="number-animate-dom" style="width:27px;text-align:center;float: left;position: relative;top: 0;" data-num="{{num}}">
                    <span class="number-animate-span" style="float:left;width:100%;height:45px;line-height:45px;color:white;">0</span>
                    <span class="number-animate-span" style="float:left;width:100%;height:45px;line-height:45px;color:white;">1</span>
                    <span class="number-animate-span"  style="float:left;width:100%;height:45px;line-height:45px;color:white;">2</span>
                    <span class="number-animate-span"  style="float:left;width:100%;height:45px;line-height:45px;color:white;">3</span>
                    <span class="number-animate-span"  style="float:left;width:100%;height:45px;line-height:45px;color:white;">4</span>
                    <span class="number-animate-span"  style="float:left;width:100%;height:45px;line-height:45px;color:white;">5</span>
                    <span class="number-animate-span"  style="float:left;width:100%;height:45px;line-height:45px;color:white;">6</span>
                    <span class="number-animate-span"  style="float:left;width:100%;height:45px;line-height:45px;color:white;">7</span>
                    <span class="number-animate-span" style="float:left;width:100%;height:45px;line-height:45px;color:white;">8</span>
                    <span class="number-animate-span"  style="float:left;width:100%;height:45px;line-height:45px;color:white;">9</span>
                    <span class="number-animate-span"  style="float:left;width:100%;height:45px;line-height:45px;color:white;">0</span>
                    <span class="number-animate-span"  style="float:left;width:100%;height:45px;line-height:45px;color:white;">.</span>
                  </div>`;
    this.extend(this.setting, y);
    this.init(this.$parent, y)
  }

  init(x, y) {
    x.innerHTML = this.setNumDom(this.numToArr(this.setting.num))
    this.animate(x);
  };

  animate($parent) {//执行动画
    let $dom = $parent.querySelectorAll('.number-animate-dom');
    for (let o of $dom) {
      let num = o.getAttribute('data-num');
      //if(this.setting.zero) num = (num==0?10:num);
      this._height = o.offsetHeight / 12;
      o.style['transform'] = o.style['-webkit-transform'] = 'translateY(' + (num == "." ? -11 * this._height : -num * this._height) + 'px)';
      o.style['transition'] = o.style['-webkit-transition'] = (num == "." ? 0 : this.setting.speed / 1000) + 's'
    }
  }

  setNumDom(arrStr) {//分割符号
    let shtml = '<div class="number-animate" style=" line-height: 45px;height: 45px;font-size: 40px;overflow: hidden;display: inline-block;position: relative;">';
    arrStr.forEach((o, i) => {
      if (i != 0 && (arrStr.length - i) % 3 == 0 && this.setting.symbol != "" && o != ".") {
        shtml += '<div class="number-animate-dot" style=" width: 21px;float: left;text-align: center;"><span>' + this.setting.symbol + '</span></div>' + this.html.replace("{{num}}", o);
      } else {
        shtml += this.html.replace("{{num}}", o);
      }
    });
    shtml += '</div>';
    return shtml;
  }

  update(num) {
    let newArr = this.numToArr(num), $dom = this.$parent.querySelectorAll(".number-animate-dom");
    if ($dom.length != newArr.length) {
      this.$parent.innerHTML = this.setNumDom(this.numToArr(num))
    } else {
      ;[].forEach.call($dom, (o, i) => {
        o.setAttribute('data-num', newArr[i]);
      });
    }
    this.animate(this.$parent);
  }

  numToArr(num) {
    num = parseFloat(num).toFixed(this.setting.dot);
    let arrStr = typeof(num) == 'number' ? num.toString().split("") : num.split("")
    return arrStr;
  }

  extend(n, n1) {
    for (let i in n1) {
      n[i] = n1[i]
    }
    ;
  }
}
