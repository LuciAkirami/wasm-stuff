import fs from 'fs';

const calcWasm = fs.readFileSync('./calculator.wasm')

const cal = await WebAssembly.instantiate(new Uint8Array(calcWasm)).then((res)=>res.instance.exports);
console.log(cal.mul(5,5));
console.log(cal.add(5,5));
console.log(cal.sub(5,10));
console.log(cal.div(5,25));

// another way