/*
 *       金字塔柱状图
 * @param 使用规则
 */

import echarts from 'echarts';
export default  function prepareOption(dataOption) {
    if (dataOption.series == null || dataOption.series.length == 0) {
        return;
    }
    if(dataOption.title){
         dataOption.title.show = false;
    }

    if (dataOption.series) {

        //计算数组series中data下value的最大值，给y轴的max属性使用
        var max = 0;
        var yAxisData = [];
        var legendData = [];
            for (var i = 0; i < dataOption.series.length; i++) {
            legendData.push(dataOption.series[i].name);
            }
            for (var j = 0; j < dataOption.series[0].data.length; j++) {
                 dataOption.series[0].data[j].value = -dataOption.series[0].data[j].value;
                // if (Number(dataOption.series[i].data[j].value) > max) {
                //     max = Number(dataOption.series[i].data[j].value);
                //     max = (max/0.9).toFixed(2);
                // }
            }
            // max = Number(max).toFixed(0);
            // max =Math.round(max);
        // }

        //通过series的data中name属性进行存储，给x轴的data属性使用
        for(var k = 0 ;k <dataOption.series[0].data.length; k++){
            yAxisData.push(dataOption.series[0].data[k].name);
        }

    }

    //操作tooltip 按照真值显示效果显示
    dataOption.tooltip = {};
    if (dataOption.tooltip) {
        if (dataOption.tooltip.formatter) {
            dataOption.tooltip.formatter = function (params) {
                if (params.data.value < 0) {
                    return params.seriesName + "<br />" + params.name + "<br />" + -params.data.value;
                } else {
                    return params.seriesName + "<br />" + params.name + "<br />" + params.data.value;
                }

            }
        } else {
            dataOption.tooltip.formatter = function (params) {
                if (params.data.value < 0) {
                    return params.seriesName + "<br />" + params.name + "<br />" + -params.data.value;
                } else {
                    return params.seriesName + "<br />" + params.name + "<br />" + params.data.value;
                }

            }
        }
    }

    if(dataOption.xAxisNames == null || dataOption.xAxisNames.length == 0){
        return;
    }
    if(dataOption.xAxisNames){

        //为下面操作x轴的各种属性做准备
        dataOption.xAxis = [{}];
        var length = dataOption.xAxis.length;
        for (var k = 0; k < length; k++) {
            dataOption.xAxis[k] = {
                name: dataOption.xAxisNames[0],
                type: 'value',
                axisTick: {
                    show:false
                },
                axisLine :{
                    show:true
                },
                splitArea: {
                    show: false,
                },
                splitLine: {
                    show: true
                },
                axisLabel:{
                    formatter:function (value) {
                        if (value < 0){
                            return -value;
                        }else {
                            return value;
                        }
                    }
                }
            }
        }
    }

    if(dataOption.yAxisNames == null || dataOption.yAxisNames.length == 0){
        return;
    }
    if(dataOption.yAxisNames){
        dataOption.yAxis = [
            {
                name: dataOption.yAxisNames[0],
               // max: max,
                data: yAxisData,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,

                },
                axisLabel: {},
                splitLine: {
                    show: false
                },
                type: 'category',
            },
            {
                name: dataOption.yAxisNames[0],
                //max: max,
                data: yAxisData,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,

                },
                axisLabel: {
                    show:false
                },
                splitLine: {
                    show: false
                },
                type: 'category',
            }
        ];
    }

    dataOption.grid ={
        top:30,
        left:65,
        right:50,
        bottom:30,
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


    var length = dataOption.series.length;
    //利用barGap做出分组影印叠加背景效果
    dataOption.series[length - 1].barGap = "100%";
    for (var i = 0; i < length; i++) {

        dataOption.series[i].itemStyle = {
            normal: {
                barBorderRadius: 50
            }
        };
        dataOption.series[i].barMaxWidth = "10";

        if (dataOption.series[i].type != "bar") {
            continue;
        }
        dataOption.series[length -1].yAxisIndex = 1;
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

    var  dataOjO = {
        //BI 颜色
        color:['#2463d5', '#94baf9', '#1d3c6a', '#dc4e41', '#221e1e', '#1da1f2',
            '#8672d5', '#d02e2a', '#ff5700'],

        //mobike 颜色
        //  color:["#C54E42","#05A8D1","#D1D1D3","#2EA2AA","#2344FE","#8672d5"],
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
    echarts.registerTheme('barPyramidStyle', theme);
}
