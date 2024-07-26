FROM alpine:latest

RUN apk add --no-cache certbot openssl bash 

RUN mkdir -p /var/log /etc/letsencrypt /etc/letsencrypt/cert /etc/letsencrypt/trash /var/www/certbot

COPY renew_cert.sh /usr/local/bin/renew_cert.sh

RUN chmod +x /usr/local/bin/renew_cert.sh

RUN echo "0 0 * * * /usr/local/bin/renew_cert.sh >> /var/log/renew_cert.log 2>&1" > /etc/crontabs/root

EXPOSE 80

CMD ["crond", "-f"]