<template>
	<div :class="[prefixCls+'-spinner']">
		<span 
			:style="computedAnimate(n)" 
			v-for="n in lines" 
			:class="[prefixCls+'-spinner-li']" 
			:key="'lines'+n">
			<span :style="computedInnerAnimate(n)" :class="[prefixCls+'-spinner-span']"></span>
		</span>
    </div>
</template>
<script>
	export default {
	    name: 'spin',
	    props: {
	        prefixCls: {
	            type: String,
	            default: 'jad'
	        },
	        lines: {
	            type: Number,
	            default: 12,
	        },
	        length: {
	            type: Number,
	            default: 7,
	        },
	        width: {
	            type: Number,
	            default: 5,
	        },
	        radius: {
	            type: Number,
	            default: 10,
	        },
	        rotate: {
	            type: Number,
	            default: 0,
	        },
	        opacity: {
	            type: Number,
	            default: 0.25,
	        },
	        speed: {
	            type: Number,
	            default: 1.4,
	        },
	        corners: {
	            type: Number,
	            default: 1,
	        },
	        className: {
	            type: String,
	            default: '',
	        },
	        isShowShadow: {
	            type: Boolean,
	            default: false,
	        },
	        color: {
	            type: String,
	            default: '#000',
	        },
	    },
	    data(){
	        return {
	            hwaccel: true,
	            styleList: {},
	            shadow: '0 0 4px #000',
	            trail: 60,
	        }
	    },
	    methods: {
	        creatDom(e, n) {
	            let r = document.createElement(e || 'div'),
	                i;
	            for (i in n) r[i] = n[i];
	            return r
	        },
	        appendDom: function (e) {
	            for (let t = 1, n = arguments.length; t < n; t++) e.appendChild(arguments[t]);
	            return e
	        },
	        renderStyleSheet: function () {
	            let e = this.creatDom('style', {
	                type: 'text/css'
	            });
	            return this.appendDom(document.getElementsByTagName('head')[0], e), e.sheet || e.styleSheet
	        },
	        animatFn: function (e, t, n, r) {
	            let o = ['opacity', t, ~~ (e * 100), n, r].join('-'),
	                u = .01 + n / r * 100,
	                f = Math.max(1 - (1 - e) / t * (100 - u), e);
	            return this.styleList[o] 
				|| (this.renderStyleSheet().insertRule('@keyframes ' + o + '{' + '0%{opacity:' + f + '}' + u + 
				'%{opacity:' + e + '}' + (u + .01) + '%{opacity:1}' + (u + t) % 100 + '%{opacity:' + e + '}' + 
				'100%{opacity:' + f + '}' + '}',
				this.renderStyleSheet().cssRules.length), this.styleList[o] = 1), o
	        },
	        computedAnimate(n){
	            return {
	                'top': 1 + ~(this.width / 2) + 'px',
	                'animation': this.animatFn(this.opacity, this.trail, n, this.lines) + ' ' + 1 / this.speed + 
					's linear infinite'
	            }
	        },
	        computedInnerAnimate(n){
	            return {
	                width: this.length + this.width + 'px',
	                height: this.width + 'px',
	                background: this.color,
	                boxShadow: this.isShowShadow && this.shadow,
	                transformOrigin: 'left',
	                transform: 'rotate(' + ~~(360 / this.lines * n + this.rotate) + 
					'deg) translate(' + this.radius + 'px' + ',0)',
	                borderRadius: (this.corners * this.width >> 1) + 'px'
	            }
	        }

    }
}
</script>