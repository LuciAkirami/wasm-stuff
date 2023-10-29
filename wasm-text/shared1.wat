(module
    (import "js" "table" (table 1 funcref)) ;; import a memory of 1 page i.e. 64kb
    (import "js" "memory" (memory 1)) ;; import a table containing 1 fn ref
    (type $result_i32 (func (result i32))) ;; create a type telling that references need to fn that return i32
    (func (export "getValue") (result i32)
        i32.const 0
        i32.const 205
        i32.store ;; store 205 at index 0 in memory, also can be written as "(i32.store (i32.cosnt 0) (i32.const 205))"
        i32.const 0
        call_indirect (type $result_i32) ;; calls 0th fn from the table that returns i32
        ;; here our fn is stored in shared0.wasm, which is being called here
    )
)