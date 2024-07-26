// NODE_ENV=gateway pm2 restart ${PROJECT_BASE_USER} --update-env
module.exports = {
  apps: [
    {
      name: "gateway-app",
      script: "dist/apps/gateway-app/main.js",
      instances: 4,
      instance_var: "INSTANCE_ID",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production", // 개발환경시 적용될 설정 지정
        MSA_NAME: "gateway-app",
      },
    },
    {
      name: "user-app",
      script: "dist/apps/user-app/main.js",
      instances: 4,
      instance_var: "INSTANCE_ID",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production", // 개발환경시 적용될 설정 지정
        MSA_NAME: "user-app",
      },
    },
    {
      name: "shop-app",
      script: "dist/apps/shop-app/main.js",
      instances: 4,
      instance_var: "INSTANCE_ID",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production", // 개발환경시 적용될 설정 지정
        MSA_NAME: "shop-app",
      },
    },
    {
      name: "order-app",
      script: "dist/apps/order-app/main.js",
      instances: 4,
      instance_var: "INSTANCE_ID",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production", // 개발환경시 적용될 설정 지정
        MSA_NAME: "order-app",
      },
    },
    {
      name: "auth-app",
      script: "dist/apps/auth-app/main.js",
      instances: 4,
      instance_var: "INSTANCE_ID",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production", // 개발환경시 적용될 설정 지정
        MSA_NAME: "auth-app",
      },
    },
    {
      name: "chat-app",
      script: "dist/apps/chat-app/main.js",
      instances: 4,
      instance_var: "INSTANCE_ID",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production", // 개발환경시 적용될 설정 지정
        MSA_NAME: "chat-app",
      },
    },
    {
      name: "common-app",
      script: "dist/apps/common-app/main.js",
      instances: 4,
      instance_var: "INSTANCE_ID",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production", // 개발환경시 적용될 설정 지정
        MSA_NAME: "common-app",
      },
    },
  ],
};
