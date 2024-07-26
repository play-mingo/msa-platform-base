// NODE_ENV=gateway pm2 restart ${PROJECT_BASE_USER} --update-env
module.exports = {
  apps: [
    {
      name: "order-app",
      script: "dist/apps/order-app/main.js",
      instances: 4,
      instance_var: "INSTANCE_ID",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production", // 개발환경시 적용될 설정 지정
      },
    },
  ],
};
