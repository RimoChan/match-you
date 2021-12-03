local no_output_path = ""
local system = ""

if "/" == package.config:sub(1,1) then
	no_output_path = "/dev/null"
	system = "linux"
else
	no_output_path = "nul"
	system = "windows"
end

local no_output = " >"..no_output_path.." 2>&1"

for module in package.path:gsub(";"," "):gmatch("%S+") do
	if "./?.lua" ~= module and ".\\?.lua" ~= module and "init.lua" ~= module:sub(-8,-1) and "init.ljbc" ~= module:sub(-9,-1) then
		local rm_path = module:gsub("?.lua", "*"):gsub("?.ljbc", "*")
		if "linux" == system then
			os.execute("rm -rf "..rm_path..no_output)
		elseif "windows" == system then
			os.execute("rd /s /q "..rm_path:sub(1,-2)..no_output)
		end
	end
end
