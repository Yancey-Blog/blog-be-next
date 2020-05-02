module.exports = {
  apps: [
    {
      name: 'blog-be',
      script: 'dist/main.js',
      watch: true,
      autorestart: true,
      max_memory_restart: '1G',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'https://github.com/Yancey-Blog/blog-be-next',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': '',
  //   },
  // },
}
