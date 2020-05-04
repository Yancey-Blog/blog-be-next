module.exports = {
  apps: [
    {
      name: 'blog-be',
      script: './dist/main.js',
      watch: ['./dist/'],
      ignore_watch: ['node_modules'],
      autorestart: true,
      max_memory_restart: '1G',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
