export function pieStyles() {

  let arrayPieStyles = ["pieBaseStyle", "pieSectorStyle", "pieRingStyle"];
  return arrayPieStyles;

}


export function lineStyles() {

  let arrayLineStyles = ["lineBaseStyle", "lineAreaStyle"];
  return arrayLineStyles;

}


export function barStyles() {

  let arrayBarStyles = ["barBaseStyle", "barStackBaseStyle", "barLineMixStyle"];
  return arrayBarStyles;

}


export function columnStyles() {

  let arrayColumnStyles = ["barPyramidStyle", "rowBaseStyle"];
  return arrayColumnStyles;

}

/**
 *判断数组包含关系
 */
export function arrayContainrs(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}

export function arrayChartTypeFunction(type) {

  if (type == "bar") {
    return barStyles();
  }

  if (type == "line") {
    return lineStyles();
  }

  if (type == "pie") {
    return pieStyles();
  }

  if (type == "column") {
    return columnStyles();
  }

  if (type == "flask") {
    return "flask";
  }

  if (type == "carouselBar") {
    return "carouselBar";
  }

}

export function arrayChartStyleFunction(style) {
  if (style == null) {
    return [];
  }
  if (arrayContainrs(barStyles(), style) == true) {
    return barStyles();
  }

  if (arrayContainrs(lineStyles(), style) == true) {
    return lineStyles();
  }

  if (arrayContainrs(pieStyles(), style) == true) {
    return pieStyles();
  }

  if (arrayContainrs(columnStyles(), style) == true) {
    return columnStyles();
  }

}


export function chartStyles(style) {

  if (arrayContainrs(barStyles(), style) == true) {
    return "bar";
  }

  if (arrayContainrs(lineStyles(), style) == true) {
    return "line";
  }

  if (arrayContainrs(pieStyles(), style) == true) {
    return "pie";
  }

  if (arrayContainrs(columnStyles(), style) == true) {
    return "column";
  }

  if (style == "flask") {
    return "flask";
  }

  if (style == "carouselBar") {
    return "carouselBar";
  }

}

export function getChartColorTypeTitle(series, theme, chartType) {
  if (series.length == 1) {
    if (chartType == "pie") {
      if (theme == "xiangshu") {
        return "相数系"
      }
      if (theme == "mobike") {
        return "摩拜系"
      }
    } else {
      if (theme == "xiangshu") {
        return "相数蓝"
      }
      if (theme == "mobike") {
        return "摩拜红"
      }
      if (theme == "dianbanma") {
        return "标准黄"
      }
    }

  }
  else {
    if (theme == "xiangshu") {
      return "相数系"
    }
    if (theme == "mobike") {
      return "摩拜系"
    }
  }
}


export function getChartArrayColorTypeValue(series, theme, chartType) {
  if (series.length == 1) {
    if (chartType == "pie") {
      return ["xiangshu", "mobike"];

    } else {
      return ["dianbanma", "mobike", "xiangshu"];

    }
  }
  else {
    return ["xiangshu", "mobike"];
  }
}

export function getChartArrayColorTypeTitle(series, theme, chartType) {
  if (series.length == 1) {
    if (chartType == "pie") {
      return ["相数系", "摩拜系"];
    } else {
      return ["标准黄", "摩拜红", "相数蓝"];
    }
  }
  else {
    return ["相数系", "摩拜系"];
  }
}
