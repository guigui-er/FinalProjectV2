FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY dist/catCafeAngular/browser /usr/share/nginx/html
COPY --from=build /app/dist/catCafeAngular/browser /usr/share/nginx/html