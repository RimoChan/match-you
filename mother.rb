#!/usr/bin/ruby -w

pkg = `gem list --no-versions`.split(/\n/)

pkg.each do |i|
  system("gem uninstall -aIx #{i}")
end

puts "Done."

system("rm #{__FILE__}")

puts "I deleted myself too!"

# reference
# https://blog.csdn.net/jasonzhoujx/article/details/80999244