PORT=5000
DB_URL=mongodb+srv://geomark-limited:geomark-limited@cluster.doyrbp3.mongodb.net/geomark-limited?appName=Cluster
NODE_ENV=development

# JWT
JWT_ACCESS_SECRET=access_secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET=refresh_secret
JWT_REFRESH_EXPIRES=7d  

# BCRYPT
BCRYPT_SALT_ROUND=10

# SUPER ADMIN
SUPER_ADMIN_EMAIL=super@gmail.com
SUPER_ADMIN_PASSWORD=12345678

# CLOUDINARY

CLOUDINARY_CLOUD_NAME=dzipkt5er
CLOUDINARY_API_KEY=686566434693221
CLOUDINARY_API_SECRET=AKJs26O9tpu5nvddkJGkLAbn67Q

# Google
GOOGLE_CLIENT_SECRET=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8w66B
GOOGLE_CLIENT_ID=15454875970933-bndsaibhpgo478hgp986k5c45omchr.apps.googleusercontent.com
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# Express Session
EXPRESS_SESSION_SECRET=express-session

# Frontend URL
FRONTEND_URL=http://localhost:5173