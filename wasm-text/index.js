import fs from 'fs';

const mulwasm = fs.readFileSync('./multiply.wasm')

const mul = await WebAssembly.instantiate(new Uint8Array(mulwasm)).then((res)=>res.instance.exports);
console.log(mul.mul_two(5,5));

// another way