using Pkg

Pkg.dependencies() |> values |> collect |> x -> filter(p -> p.is_direct_dep, x) |> values .|> x -> x.name |> Pkg.rm
