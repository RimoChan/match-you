const { remove, run } = Deno;

const decoder = new TextDecoder();

const denoInfo = decoder.decode(await run({
  cmd: ["deno", "info"],
  stdout: "piped",
}).output());

const re = /"(.*?)"/g;

for (let curr; curr = re.exec(denoInfo);) {
  const dir = curr[1];
  remove(dir, { recursive: true }).catch(_ => {});
}
