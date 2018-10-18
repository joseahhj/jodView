---
order: 1
---

## 基本用法

设置属性 type 为 date 、daterange、year、month、week 分别显示选择单日、选择范围、按年选择、按月选择和按周选择类型，默认为`date`。

```html
<template>
	<j-row>
        <j-col :sm="24" :md="12" :lg="12">
			<p style="font-size:14px;margin-bottom:10px">1. input形式(默认)-<br>可设置isClearable=true输入框有清除按钮</p>
			<p style="margin-bottom:10px">单日历： 
				<j-date-picker  
					style="width: 200px;display:inline-block" 
					@on-change="selectedDate" 
					key="single" isClearable></j-date-picker>
			</p>
			
			<p style="margin-bottom:10px">
				选择年： 
				<j-date-picker 
				type="year" 
				placeholder="选择年"  
				style="width: 200px;display:inline-block" 
				@on-change="selectedDate" 
				key="year"></j-date-picker>
			</p>
			<p style="margin-bottom:10px">
				选择月： 
				<j-date-picker 
				type="month" 
				placeholder="选择月"  
				style="width: 200px;display:inline-block" 
				@on-change="selectedDate" key="month"></j-date-picker>
			</p>
			<p style="margin-bottom:10px">
				双日历： 
				<j-date-picker 
				type="daterange"  
				style="width: 200px;display:inline-block" 
				@on-change="selectedDate" key="double"></j-date-picker>
			</p>
			<p style="margin-bottom:10px">
				按周选择: 
				<j-date-picker 
				type="week"  
				placeholder="按周选择" 
				style="width: 230px;display:inline-block" 
				@on-change="selectedDate" key="week"></j-date-picker>
			</p>
		</j-col>
        <j-col :md="12" :lg="12">
			<p style="font-size:14px;margin-bottom:10px">2. 按钮形式（设置isRefBtn为true）<br>可以设置btn-type（参考button组件的type）</p>
			<p style="margin-bottom:10px">
				单日历： 
				<j-date-picker 
				@on-change="selectedDate" 
				:value="value1" 
				style="width: 100px;display:inline-block" 
				isRefBtn 
				btn-type="default"></j-date-picker>
			</p>
			<p style="margin-bottom:10px">
				选择年： 
				<j-date-picker 
				type="year"  
				placeholder="选择年"  
				:value="value1" 
				style="width: 80px;display:inline-block" 
				@on-change="selectedDate" 
				isRefBtn ></j-date-picker></p>
			<p  style="margin-bottom:10px">
				选择月： 
				<j-date-picker 
				type="month" 
				placeholder="选择月"  
				style="width: 80px;display:inline-block" 
				:value="value1" 
				isRefBtn 
				@on-change="selectedDate"  
				btn-type="dash"></j-date-picker>
			</p>
			<p style="margin-bottom:10px">
				双日历： 
				<j-date-picker type="daterange"  style="width: 200px;display:inline-block" :value="value2" @on-change="selectedDate" isRefBtn btn-type="info"></j-date-picker>
			</p>
			<p style="margin-bottom:10px">
				按周选择 <j-date-picker type="week"  style="width:230px;display:inline-block" @on-change="selectedDate" isRefBtn></j-date-picker>
			</p>
		</j-col>
		
    </j-row>
	<j-row style="padding-top:30px">
		<j-col :sm="24" :md="12" :lg="12">
			<p style="font-size:14px;margin-bottom:10px">3. 双日历的第二种显示，设置 :is-range-input="true"</p>
			<j-date-picker 
				type="daterange" 
				style="width: 200px" 
				:value="value2" 
				@on-change="selectedDate" 
				:is-range-input="true"></j-date-picker>
			<p style="padding:10px 0">有图标和清除按钮</p>
			<j-date-picker 
				type="daterange" 
				@on-change="selectedDate" 
				prefix-icon="calendar-o"
				isClearable
				:is-range-input="true"
				style="width: 200px" 
				></j-date-picker>
			<p style="padding:10px 0">分隔符替换，设置 separator</p>
			<j-date-picker 
				type="daterange" 
				@on-change="selectedDate" 
				prefix-icon="calendar-o"
				isClearable
				:is-range-input="true"
				separator="分割"
				style="width: 350px" 
				></j-date-picker>
		</j-col> 
		<j-col :sm="24" :md="12" :lg="12" style="padding-left:50px">
			<p style="font-size:14px;margin-bottom:10px">4. 通过slot自定义展示</p>
			单日历:
			<j-date-picker
				style="width: 100px;display:inline-block" 
				v-model="value3"
				type="date"
				>
				<a href="javascript:void(0)" style="font-size:14px;color:blue">
					<template v-if="value3 === ''">选择日期</template>
					<template v-else>{{ value3 }}</template>
				</a>
			</j-date-picker>
			<p style="margin-bottom:10px"></p>
			双日历:
			<j-date-picker
					style="width: 200px;display:inline-block" 
					v-model="value4"
					type="daterange"
					>
					<a href="javascript:void(0)" style="font-size:14px;color:blue">
						<template v-if="!value4">选择日期</template>
						<template v-else>{{ value4.start + ' To ' + value4.end}}</template>
					</a>
			</j-date-picker>
			
		</j-col>       
	</j-row>
</template>
<script>
    export default {
		data(){
			return {
				option:{
					showWeek:true
				},
				value1:new Date(),
				value2:[(new Date()-(86400000*7)),new Date()],
				value3:'',
				value4:'',
				type:'date'
			}
		},
		methods:{
			selectedDate(obj,tag){
				console.log(obj,'123',tag)
			},
			changeType(){
				this.type = "datetimerange"
			}
		},
		watch:{
			value3(val){
				console.log(val,'value3-watch')
			},
			value4(val){
				console.log(val,'value4-watch')
			}
		}
	}
</script>
```


## 显示周数

设置属性 isShowWeekNum=true。

```html
<template>
	
		<j-date-picker type="date"  placeholder="单日历" style="width: 230px"  key="dateWk" isShowWeekNum></j-date-picker>
		<p style="margin-bottom:5px"></p>
		<j-date-picker type="week"  placeholder="按周选择" style="width: 230px"  key="weekNum" isShowWeekNum></j-date-picker>
		<p style="margin-bottom:5px"></p>
		<j-date-picker type="daterange"  placeholder="双日历" style="width: 230px"  key="rangeNum" isShowWeekNum></j-date-picker>
</template>
```