(module
  (table 2 funcref) ;; stores 2 function references, funcref -> function reference type
  (func $f1 (result i32)
    i32.const 101)
  (func $f2 (result i32)
    i32.const 102)
  (elem (i32.const 0) $f1 $f2) ;; adds fn $f1 and $f2 to the table
  (type $return_i32 (func (result i32))) ;; telling that references need to fn that return i32
  (func (export "callByIndex") (param $i i32) (result i32) 
    local.get $i
    call_indirect (type $return_i32)) ;; calls i'th fn from the table that returns i32
    ;; the above can also be written as "(call_indirect (type $return_i32) (local.get $p1))"
)
