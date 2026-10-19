export type View={cx:number;cy:number;span:number};
export type Palette='aurora'|'sunset'|'ocean';
export const initial:View={cx:-0.75,cy:0,span:3.5};
export function escapeIterations(re:number,im:number,limit:number):number {
  let x=0,y=0,n=0;
  while(x*x+y*y<=4&&n<limit){const next=x*x-y*y+re;y=2*x*y+im;x=next;n++}
  return n;
}
export function coordinate(px:number,py:number,width:number,height:number,view:View){
 const scale=view.span/width;
 return {re:view.cx+(px-width/2)*scale,im:view.cy+(py-height/2)*scale};
}
function rgb(t:number,p:Palette):[number,number,number]{
 const a=t*6.28318;
 if(p==='sunset')return [Math.floor(130+125*Math.sin(a*.8)),Math.floor(80+75*Math.sin(a+1.5)),Math.floor(120+100*Math.sin(a+3))].map(v=>Math.max(0,Math.min(255,v))) as [number,number,number];
 if(p==='ocean')return [Math.floor(30+50*Math.sin(a)),Math.floor(120+100*Math.sin(a+1)),Math.floor(170+80*Math.sin(a+2))].map(v=>Math.max(0,Math.min(255,v))) as [number,number,number];
 return [Math.floor(105+100*Math.sin(a+.3)),Math.floor(160+90*Math.sin(a+2)),Math.floor(165+80*Math.sin(a+4))].map(v=>Math.max(0,Math.min(255,v))) as [number,number,number];
}
export function render(width:number,height:number,view:View,limit:number,palette:Palette):ImageData{
 const image=new ImageData(width,height);
 for(let py=0;py<height;py++)for(let px=0;px<width;px++){const {re,im}=coordinate(px,py,width,height,view),n=escapeIterations(re,im,limit);const at=(py*width+px)*4;const color=n===limit?[6,12,25]:rgb(n/38,palette);image.data[at]=color[0];image.data[at+1]=color[1];image.data[at+2]=color[2];image.data[at+3]=255;}
 return image;
}
