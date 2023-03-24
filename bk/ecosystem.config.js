// jangan lupa tambahkan ini pada bagian paling atas file
// untuk menonaktifkan modul ES
{"type": "commonjs"}

module.exports = {
  apps: [
    {
      name: 'gateway',
      script: 'nodemon node .',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}