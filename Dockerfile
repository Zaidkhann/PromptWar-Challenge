# Stage 1: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output from the local machine (since we already ran npm run build)
COPY dist /usr/share/nginx/html

# Copy a custom nginx config if needed, or use default
# For SPA, we need to redirect all 404s to index.html
RUN echo 'server { \
    listen 8080; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on the PORT environment variable
# Default is 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
