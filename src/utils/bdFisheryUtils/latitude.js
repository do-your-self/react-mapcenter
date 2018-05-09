//经度转墨卡托
export function handle_x(x) {
  return (x / 180.0) * 20037508.34;
}

//纬度度转墨卡托
export function handle_y(y) {
  if (y > 85.05112) {
    y = 85.05112;
  }

  if (y < -85.05112) {
    y = -85.05112;
  }

  y = (Math.PI / 180.0) * y;
  var tmp = Math.PI / 4.0 + y / 2.0;
  return 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;

}

//墨卡托转经度
export function handle_me_x(x) {
  return x / 20037508.34 * 180;
}

//墨卡托转纬度
export function handle_me_y(my) {
  var mmy = my / 20037508.34 * 180;
  var y = 180 / Math.PI * (2 * Math.atan(Math.exp(mmy * Math.PI / 180)) - Math.PI / 2);
  return y;
}
