
import { ILocation } from "../types"

export const postcodeRegex = /^([A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9]{1,2}[A-Z]{0,1})$/

export const monthNames: Map<number,string> = new Map([
    [0,'January'],
    [1,'February'],
    [2,'March'],
    [3,'April'],
    [4,'May'],
    [5,'June'],
    [6,'July'],
    [7,'August'],
    [8,'September'],
    [9,'October'],
    [10,'November'],
    [11,'December'],
])

export const weatherCode: Map<number, {name:string,icon:string}> = new Map([
    [0,{name:'Clear sky',icon:'sun_max_fill'}],
    [1,{name:'Few clouds',icon:'cloud_sun'}],
    [2,{name:'Scattered clouds',icon:'cloud_sun_fill'}],
    [3,{name:'Overcast',icon:'cloud'}],
    [4,{name:'Fog',icon:'cloud_fog'}],
    [9,{name:'Smoke',icon:'smoke_fill'}],
    [10,{name:'Mist',icon:'smoke_fill'}],
    [11,{name:'Haze',icon:'sun_haze_fill'}],
    [12,{name:'Dust',icon:'sun_dust_fill'}],
    [13,{name:'Sand',icon:'sun_dust_fill'}],
    [14,{name:'Rain',icon:'cloud_heavyrain'}],
    [15,{name:'Rain showers',icon:'cloud_heavyrain_fill'}],
    [16,{name:'Rain, thunderstorm',icon:'cloud_bolt_rain_fill'}],
    [17,{name:'Snow',icon:'cloud_snow'}],
    [18,{name:'Snow showers',icon:'cloud_snow_fill'}],
    [19,{name:'Snow, thunderstorm',icon:'cloud_snow_fill'}],
    [20,{name:'Hail',icon:'cloud_hail'}],
    [21,{name:'Hail showers',icon:'cloud_hail_fill'}],
    [22,{name:'Thunderstorm',icon:'bolt_fill'}],
    [23,{name:'Squalls',icon:'wind'}],
    [24,{name:'Tornado',icon:'arrow_2_circlepath_circle'}],
    [25,{name:'Volcanic ash',icon:'arrow_2_circlepath_circle_fill'}],
])