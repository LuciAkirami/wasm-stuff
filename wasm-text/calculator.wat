(module
    (func $mul (param i32 i32) (result i32)
        local.get 0
        local.get 1
        i32.mul
    )
    (export "mul" (func $mul))

    (func (export "add") (param $p1 i32) (param $p2 i32) (result i32)
        local.get $p1
        local.get $p2
        i32.add
    )

    (func (export "sub") (param $p1 i32) (param $p2 i32) (result i32)
        local.get $p1
        local.get $p2
        i32.sub
    )

    (func (export "div") (param $p1 f64) (param $p2 f64) (result f64)
        local.get $p1
        local.get $p2
        f64.div
    )

)