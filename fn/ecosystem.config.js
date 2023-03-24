// jangan lupa tambahkan ini pada bagian paling atas file
// untuk menonaktifkan modul ES
{"type": "commonjs"}

module.exports = {
   apps: [{
    name: "my-app",
    script: "yarn",
    args: "next start -p 3000",
    env: {
      NODE_ENV: "production",
    },
  }],
}