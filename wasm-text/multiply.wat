(module
    (func $mul_two (param i32 i32) (result i32)
        local.get 0
        local.get 1
        i32.mul
    )
    (export "mul_two" (func $mul_two))

    (func (export "add_two") (param $p1 i32) (param $p2 i32) (result i32)
        local.get $p1
        local.get $p2
        i32.add
    )

)