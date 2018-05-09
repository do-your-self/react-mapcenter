/*
 *       基础饼图 （单个饼图）
 * @param 使用规则
 */

import echarts from 'echarts';
export default function prepareOption(dataOption) {
    if (dataOption.series == null || dataOption.series.length == 0) {
        return;
    }
    if(dataOption.title){
        dataOption.title.show = false;
    }

    if (dataOption.series) {

        //通过series的data中name属性进行存储，给legend的data属性使用
        var legendData = [];
        //计算每个data[j]的value值得总和
        var sum = 0;
        dataOption.series[0].startAngle = 180;
        for(var k = 0 ;k <dataOption.series[0].data.length; k++){
            legendData.push(dataOption.series[0].data[k].name);
            sum = sum + Number(dataOption.series[0].data[k].value);
        }
        //饼图图形上的文本标签，可用于说明图形的一些数据信息
        dataOption.series[0].label = {
                normal: {
                    show: false,
                    position: 'center'
                }
        };

        //标签的视觉引导线样式
        dataOption.series[0].labelLine = {
                normal:{
                    show:false
                }
        };


        dataOption.series[0].center = ['30%', '70%'];
        dataOption.series[0].radius = ['0%', '85%'];

    }
    dataOption.tooltip = {};
    if(legendData.length >=4){
        legendData = legendData.slice(0,4);
    }
    //控制图例的形状大小，位置，字体大小
    dataOption.legend = {
        orient: 'vertical',
        right: 20,
        bottom:20,
        itemWidth:18,
        itemHeight: 14,
        textStyle:{
            fontSize:10
        },
        data:  legendData
    };

    var newOptData = {
        value: sum,
        name: 'invisible',
        tooltip: {
            show: false
        },
        itemStyle: {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {show: false},
                labelLine: {show: false}
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        }
    };

    dataOption.series[0].data.push(newOptData);
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

    var  dataOjO = {
        //BI 颜色
        color:['#2463d5', '#94baf9', '#1d3c6a', '#dc4e41', '#221e1e', '#1da1f2',
            '#8672d5', '#d02e2a', '#ff5700'],
        categoryAxis: {

            //坐标轴刻度相关设置,不显示坐标刻度
            "axisTick": false,

            "nameTextStyle": {
                "color": "#FFFFFF",//BEBFC3
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
                "show":false,
                "lineStyle": {
                    "type": "solid",
                    "color": "#242529",
                    "width": "3"
                }
            },

            // //坐标轴在grid区域中的分隔线
            "splitLine": {
                "show": true,
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
                "show":false,
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

            //坐标轴在 grid 区域中的分隔区域
            "splitArea": {
                show: false,
                "areaStyle": {
                    "color": ['rgba(116,194,199,0.6)', 'rgba(121,161,191,0.6)', 'rgba(65,138,179,0.6)',
                              'rgba(34,121,180,0.6)']
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
        backgroundColor: '#1E1D22',
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
        categoryAxis:dataOjO.categoryAxis,
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
    echarts.registerTheme('pieSectorStyle', theme);
}
