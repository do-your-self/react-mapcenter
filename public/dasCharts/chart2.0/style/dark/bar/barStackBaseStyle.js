/*
 *       堆叠柱状图
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

        //计算数组series中data下value的Stack堆叠相加的值，给y轴的max属性使用
        var max = 0;
        var temp = [];
        var xAxisData = [];
        var legendData = [];
        for (var i = 0; i < dataOption.series.length; i++) {
            var tt = dataOption.series[i].data.length;
            legendData.push(dataOption.series[i].name);
            for (var j = 0; j < dataOption.series[i].data.length; j++) {
                temp.push(Number(dataOption.series[i].data[j].value));

                if (Number(dataOption.series[i].data[j].value) > max) {
                    max = Number(dataOption.series[i].data[j].value);
                }
            }


            dataOption.series[i].barMaxWidth = "10";
            dataOption.series[i].stack = "stack";
        }

        //separate分隔,为计算Stack堆叠值提供一个标识
        var sep = temp.length / tt;
        max = (max * sep).toFixed(2);
        max = Number(max).toFixed(0);
        max =Math.round(max);


        //通过series的data中name属性进行存储，给x轴的data属性使用
        for (var k = 0; k < dataOption.series[0].data.length; k++) {
            xAxisData.push(dataOption.series[0].data[k].name);
        }

    }
    dataOption.tooltip = {};
    if (dataOption.xAxisNames == null || dataOption.xAxisNames.length == 0) {
        return;
    }
    if (dataOption.xAxisNames) {
        dataOption.xAxis = [
            {
                name: dataOption.xAxisNames[0],
                type: 'category',
                data: xAxisData
            },
            {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {

                    show: false
                },
                axisLabel: {
                    interval: 0,
                    show: false,

                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: xAxisData

            },

        ];
    }

    if (dataOption.yAxisNames == null || dataOption.yAxisNames.length == 0) {
        return;
    }
    if (dataOption.yAxisNames) {
        dataOption.yAxis = [
            {
                name: dataOption.yAxisNames[0],
                type: 'value',
                max: max,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,

                },
                axisLabel: {},

                splitArea: {
                    show: false,
                    areaStyle: {

                        color: ['rgba(116,194,199,0.6)', 'rgba(121,161,191,0.6)', 'rgba(65,138,179,0.6)', 'rgba(34,121,180,0.6)']
                    }
                },
                splitLine: {
                    show: true
                },

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
        right:10,
        textStyle:{
          fontSize:10
        },
        data:legendData
    };

    var length = dataOption.series.length;
    var newObj;
    var optionNew = [];

    //做出堆叠柱状图,最上面的圆角效果
    dataOption.series[length - 1].itemStyle = {
        normal: {
            barBorderRadius: [50, 50, 0, 0]
        }
    };

    //做出堆叠柱状图背后的背景阴影的效果
    newObj = copyDeep(dataOption.series[length - 1]);
    newObj.xAxisIndex = 1;
    newObj.stack = "";
    newObj.itemStyle = {
        normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#20232C'},
                    {offset: 1, color: '#242A40'}
                ]
            ),
            borderWidth: 0,
            opacity: 0.5

        }
    };

    //构造背景柱状图的数据
    for (var j = 0; j < newObj.data.length; j++) {
        newObj.data[j].value = dataOption.yAxis[0].max;
    }

    newObj.z = 0;          //默认的z的值是2，防止背景图遮挡数据的柱状图
    newObj.silent = true;  //取消背景的tooltip提示效果
    optionNew.unshift(newObj);
    for (var k = 0; k < optionNew.length; k++) {
        dataOption.series.push(optionNew[k]);

    }
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
    echarts.registerTheme('barStackBaseStyle', theme);
}
