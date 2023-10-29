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
var importObject = {
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

// ----------- WASM Tables ----------
const table = fs.readFileSync("./wasm-table.wasm");
const wasmTable = await WebAssembly.instantiate(new Uint8Array(table)).then(
  (obj) => obj.instance.exports
);
// calling the first fn stored in the table
console.log(wasmTable.callByIndex(0));
// calling the second fn stored in the table
console.log(wasmTable.callByIndex(1));
// returns WebAssembly.RuntimeErrorL table index out of bounds as out table contains
// only 2 references
//console.log(wasmTable.callByIndex(2));

// -------- Sharing Tables and Memory -----------
// create an import object that contains a table and a memoery which can be imported by
// the wasm and for the table, let the table store "1" reference of type func and
// let the memory be 1 i.e. 1 page 64KB
var importObject = {
  js: {
    table: new WebAssembly.Table({ initial: 1, element: "anyfunc" }),
    memory: new WebAssembly.Memory({ initial: 1 }),
  },
};

// load the two shared wasm files
const load_shared0 = fs.readFileSync("./shared0.wasm");
const load_shared1 = fs.readFileSync("./shared1.wasm");

// instantiate both the wasm file with the importObject
const shared0Wasm = await WebAssembly.instantiate(
  new Uint8Array(load_shared0), importObject
).then((obj) => obj.instance.exports);
const shared1Wasm = await WebAssembly.instantiate(
  new Uint8Array(load_shared1), importObject
).then((obj) => obj.instance.exports);

// call the getValue fn from shared1, which calls the fn defined in shared0, which get
// the value stored in memory by shared0
console.log(shared1Wasm.getValue());
