(module
    (global $g (import "js" "global" )(mut i32))
    (func (export "getGlobal") (result i32)
        global.get $g
    )
    (func (export "incrGlobal") (result i32)
        global.get $g
        i32.const 1
        i32.add
    )
    (func (export "incrAndStoreGlobal") (result i32)
        (global.set $g (i32.add (global.get $g) (i32.const 1)))
        global.get $g
    )
)