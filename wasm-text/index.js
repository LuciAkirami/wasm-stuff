import fs from "fs";

// -------- importing the calculator wasm file ------------
const calcWasm = fs.readFileSync("./calculator.wasm");

const cal = await WebAssembly.instantiate(new Uint8Array(calcWasm)).then(
  (res) => res.instance.exports
);
console.log(cal.mul(5, 5));
console.log(cal.add(5, 5));
console.log(cal.sub(5, 10));
console.log(cal.div(5, 25));

// --------- importing the call wasm file -------------
const callWasm = fs.readFileSync("./call.wasm");
const call = await WebAssembly.instantiate(new Uint8Array(callWasm)).then(
  (obj) => obj.instance.exports
);
console.log(call.getAnswerPlus1());

// ---------- exporting fn from js and importing it -------------
// For the logger.wat, we need an object (let's call it importObject) such that
// importObject.console.log is a JavaScript function.
const importObject = {
  console: {
    log(arg1, arg2) {
      console.log(arg1, arg2);
    },
  },
};

const loggerWasm = fs.readFileSync("./logger.wasm");

// we are passing both the wasm buffer and the importObject
const logger = await WebAssembly.instantiate(
  new Uint8Array(loggerWasm),
  importObject
).then((obj) => obj.instance.exports);
// the below will be console.log(45)
logger.logIt(97);

// ------ creating a global value to be used between wasm and js ---------
const global = new WebAssembly.Global({ value: "i32", mutable: true }, 0);
const globalWasm = fs.readFileSync("./global.wasm");
const globalValue = await WebAssembly.instantiate(new Uint8Array(globalWasm), {
  js: { global },
}).then((obj) => obj.instance.exports);

// calling the fn declared in global.wat, which prints the global value
console.log(globalValue.getGlobal());
// updating the global value
global.value = 45;
// calling the fn again to check if the global value is updated
console.log(globalValue.getGlobal());
// calling the fn in global.wat which gets the global val increments  by 1
console.log(globalValue.incrGlobal());
// calling the fn in wasm which gets global val, incr by 1 and stores it as new global;
globalValue.incrAndStoreGlobal();
console.log(global.value);
