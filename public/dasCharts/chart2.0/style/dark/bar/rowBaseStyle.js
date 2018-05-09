/*
 *       基础条形图(x轴方向的柱状图)
 * @param 使用规则
 */

import echarts from 'echarts';
export default  function prepareOption(dataOption) {
    if (dataOption.series == null || dataOption.series.length == 0) {
        return;
    }
    if (dataOption.title) {
        dataOption.title.show = false;
    }

    if (dataOption.series) {

        //修改series中的将要展示的条形--柱状图柱状的形状
        var yAxisData = [];
        var legendData = [];
        for (var i = 0; i < dataOption.series.length; i++) {
          legendData.push(dataOption.series[i].name);
            dataOption.series[i].itemStyle = {
                normal: {
                    barBorderRadius: 50
                }
            };
            dataOption.series[i].barMaxWidth = "10";
            dataOption.series[i].label= {
                normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        color: 'white'
                    }
                }
            }

        }

        //通过series的data中name属性进行存储，给y轴的data属性使用
        for (var k = 0; k < dataOption.series[0].data.length; k++) {
            yAxisData.push(dataOption.series[0].data[k].name);
        }

    }
    dataOption.tooltip = {};

    if (dataOption.yAxisNames == null || dataOption.yAxisNames.length == 0) {
        return;
    }
    if (dataOption.yAxisNames) {
        dataOption.yAxis = [
            {
                name: dataOption.yAxisNames[0],
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: "#242529",
                        type:"solid",
                        width:1
                    }
                },
                nameTextStyle:{
                  color:"#fff",
                },
                axisLabel:{
                  color:"#fff"
                },
                data: yAxisData
            }
        ];
    }

    if (dataOption.xAxisNames == null || dataOption.xAxisNames.length == 0) {
        return;
    }
    if (dataOption.xAxisNames) {
        dataOption.xAxis = [
            {
                name: dataOption.xAxisNames[0],
                axisTick: {
                    show: false
                },
                nameTextStyle:{
                  color:"#fff",
                },
                axisLabel:{
                  color:"#fff"
                },
                axisLine: {
                    show: false,

                },

                splitArea: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                      // 使用深浅的间隔色
                      color: ['#4674b3'],
                      opacity:"0.2"
                    }
                },
                type: 'value',
            }
        ];
    }

    dataOption.grid = {
        top: 30,
        left: 55,
        right: 50,
        bottom: 30,
    };

    dataOption.legend = {
        itemWidth:20,
        itemHeight:10,
        textStyle:{
            fontSize:10
        },
        right:10,
        data:  legendData
    };


    //var length = dataOption.series.length;
    //利用barGap做出分组影印叠加背景效果
   // dataOption.series[length - 1].barGap = "100%";
 registerTheme();
}

// 深度复制，制作出柱状图叠加的效果
function copyDeep(o) {
    var out, v, key;
    out = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        out[key] = (typeof v === "object") ? copyDeep(v) : v;
    }
    return out;
}


function registerTheme() {
  var factory = themeFactory;
  if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
  } else {
    // Browser globals
    factory({}, echarts);
  }
}

function themeFactory(exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    var contrastColor = '#eee';
    var axisCommon = function () {
        return {
            axisLine: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisTick: {
                lineStyle: {
                    color: contrastColor
                }
            },
            axisLabel: {
                textStyle: {
                    color: contrastColor
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#aaa'
                }
            },
            splitArea: {
                areaStyle: {
                    color: contrastColor
                }
            }
        };
    };

    var dataOjO = {
        //BI 颜色
        color: ['#2463d5', '#94baf9', '#1d3c6a', '#dc4e41', '#221e1e', '#1da1f2',
            '#8672d5', '#d02e2a', '#ff5700'],
        categoryAxis: {

            //坐标轴刻度相关设置,不显示坐标刻度
            "axisTick": false,

            "nameTextStyle": {
                "color": "#FFFFFF",
                "fontSize": "10"
            },

            //设置y轴上文字显示的颜色
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": '#89898B'
                }
            },

            //坐标轴轴线相关设置。
            "axisLine": {
                "lineStyle": {
                    "type": "solid",
                    "color": "#242529",
                    "width": "3"
                }
            },

            // //坐标轴在grid区域中的分隔线
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#ccc"
                    ]
                }
            },
            //坐标轴在 grid 区域中的分隔区域
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            }
        },
        valueAxis: {
            //坐标轴刻度相关设置,不显示坐标刻度
            "axisTick": false,
            "nameTextStyle": {
                "color": "#FFFFFF",
                "fontSize": "10"
            },
            //坐标轴轴线相关设置,
            "axisLine": {
                "lineStyle": {
                    "color": "#242529",
                    "width": 3
                }
            },
            "axisLabel": {
                "show": true,
                // 修改的是x/y轴,文本的字体颜色
                "textStyle": {
                    "color": '#89898B'
                }

            },
            "splitLine": {
                "lineStyle": {
                    "type": 'dashed',
                    "color": '#242529'
                }
            },


        },

    };
    var theme = {
        color: dataOjO.color,
        backgroundColor: '#000000',
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: contrastColor
                },
                crossStyle: {
                    color: contrastColor
                }
            }
        },
        legend: {
            textStyle: {
                color: contrastColor
            }
        },
        textStyle: {
            color: contrastColor
        },
        title: {
            textStyle: {
                color: contrastColor,
                fontStyle: 'normal',
                fontWeight: 'bolder',
                fontFamily: 'sans-serif',
                fontSize: 18,
            },
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: contrastColor
                }
            }
        },
        dataZoom: {
            textStyle: {
                color: contrastColor
            }
        },
        timeline: {
            lineStyle: {
                color: contrastColor
            },
            itemStyle: {
                normal: {
                    color: dataOjO.color[1]
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: contrastColor
                    }
                }
            },
            controlStyle: {
                normal: {
                    color: contrastColor,
                    borderColor: contrastColor
                }
            }
        },
        timeAxis: axisCommon(),
        logAxis: axisCommon(),
        // valueAxis: axisCommon(),
        // categoryAxis: axisCommon(),
        categoryAxis: dataOjO.categoryAxis,
        valueAxis: dataOjO.valueAxis,

        graph: {
            color: dataOjO.color
        },
        gauge: {
            title: {
                textStyle: {
                    color: contrastColor
                }
            }
        },
        candlestick: {
            itemStyle: {
                normal: {
                    color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                }
            }
        },

    };
    //theme.categoryAxis.splitLine.show = false;
    echarts.registerTheme('rowBaseStyle', theme);
}
