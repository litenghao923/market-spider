// redis单节点配置
const redisConfig = {
    port: 6379,
    host: '127.0.0.1',
    password: '', // 没有可不填
  };
  
  
  // redis集群配置
  const redisClusterConfig = [
    {
      port: 9736,
      host: 'xxx.xx.xx.xx',
    },
  
  
    {
      port: 9736,
      host: 'xxx.xx.xx.xx',
    },
  ];
  export { redisConfig, redisClusterConfig };
  