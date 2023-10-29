(module
    (import "console" "log" (func $log (param i32) (param i32)))
    (func (export "logIt") (param $p1 i32)
        i32.const 45
        local.get $p1
        call $log
    )
)