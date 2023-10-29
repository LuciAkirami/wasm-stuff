(module
  (import "js" "memory" (memory 1)) ;; import a memory of 1 page i.e. 64kb
  (import "js" "table" (table 1 funcref)) ;; import a table containing 1 fn ref
  (elem (i32.const 0) $shared0func) ;; store $shared0func in table
  (func $shared0func (result i32)
   i32.const 0
   i32.load) ;; fn loads the i32 thats present at 0th index in memory and returns it
   ;; in shared1.wasm, we are storing an i32 val in memory which we are loading here
)
