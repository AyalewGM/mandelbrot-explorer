import {describe,it,expect} from 'vitest';
import {coordinate,escapeIterations,initial} from './fractal';
describe('Mandelbrot escape time',()=>{
 it('origin remains bounded at any reasonable cutoff',()=>expect(escapeIterations(0,0,300)).toBe(300));
 it('c=2 escapes quickly',()=>expect(escapeIterations(2,0,300)).toBeLessThan(5));
 it('c=-1 remains bounded',()=>expect(escapeIterations(-1,0,300)).toBe(300));
 it('center pixel maps exactly to viewport center',()=>{const p=coordinate(380,270,760,540,initial);expect(p.re).toBe(initial.cx);expect(p.im).toBe(initial.cy)});
});
