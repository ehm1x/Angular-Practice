export class ColorMapper {
    static colorMap = {
        PtsColor: [25, 18, 13, 10],
        TargetsColor: [13, 9, 6, 5],   
        RecColor: [13, 10, 6, 4],
        TdColor: [3, 2, 1],
        RankColor: [2,3,8,12],
        PassAttColor: [45, 40, 30, 25],
        PassCompColor: [30, 25, 20, 15],
        PassYdColor: [300, 250, 200, 150],
        PassTdColor: [4, 3, 2, 1],
        QbRushAttColor: [10, 8, 6, 4],
        QbRushYdColor: [50, 40, 20, 10],
        QbRushTdColor: [2, 1],
        QbPtsColor: [30, 25, 20, 15],
        RushYdColor: [100, 80, 60, 40],
        RushAttColor: [20, 15, 10, 5],
        RbReceptionsColor: [9, 6, 4, 2],
        RbTargetColor: [12, 9, 6, 3],
        RecTdColor: [2, 1],
        WrRecYdColor: [100, 80, 60, 40],
        RbRecYdColor: [50, 40, 30, 20],
        SeasonRankColor:[5,20,45,70],
        SeasonAvgColor:[20,15,10,5],
        SeasonTdsColor:[8,5,3,1],
        SeasonIntColor:[3,5,8,10],
      };

        static findFunc(funcName:string, value:number, reverse = 0) {
            const mapValue = ColorMapper.colorMap[funcName as keyof typeof ColorMapper.colorMap];
            const breakpoints = Array.isArray(mapValue) ? mapValue : [];
            return ColorMapper.findColor(value, breakpoints, reverse);
        }

        static findColor(value:number, breakpoints: number[], reverse:number) {
            const colors = ['bg-yellow-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500'];
            const defaultColor = 'bg-red-500';
            for (let i = 0; i < breakpoints.length; i++) {
                if (reverse ? value <= breakpoints[i] : value >= breakpoints[i]) {
                    return colors[i];
                }
            }
            return defaultColor;
        }
    }