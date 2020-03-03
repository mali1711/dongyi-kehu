<template>
	<rich-text :nodes="html"></rich-text>
</template>

<script>
	export default {
		name:'highlight',
		props:{
			content:{
				type:String,
				default:''
			},
			keys:{
				type:String,
				default:''
			},
			color:{
				type:String,
				default:'#FD463E'
			},
			weight: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			html() {
				if(this.keys===''){
					return this.content;
				}
				var reg = new RegExp((`(${this.keys})`), "gm");
				var color = this.color || '#FD463E';
				var weight = this.weight ? 'bold' : 'normal';
				var replace = '<span style="color:' + color + ';font-weight: ' + weight + ';">$1</span>';
				return this.content.replace(reg, replace);
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>