module.exports = {
    
      DB_USER: process.env.DB_USER ||  'root',
      DB_PASS: process.env.DB_PASS || 'example',
      DB_DATABASE: process.env.DB_DATABASE || 'test',
      DB_HOST: process.env.DB_HOST || 'localhost' , 
      DB_PORT: process.env.DB_PORT || '27017'
};
