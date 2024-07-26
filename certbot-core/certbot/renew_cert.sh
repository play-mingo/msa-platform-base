#!/bin/bash

# 인증서 디렉토리 설정 (기본값: /etc/letsencrypt/live/yourdomain.com)
CERT_DIR="/etc/letsencrypt/live/$SERVER_DOMAIN"
FULLCHAIN="$CERT_DIR/fullchain.pem"
RENEW_DATE=$(date '+%Y-%m-%d')

# 인증서가 존재하지 않을 경우 인증서 발급
if [ ! -f $FULLCHAIN ]; then
    echo "CERT: $FULLCHAIN"
    echo "Certificate does not exist. Generating new certificate..."

    # 기존 인증서 데이터가 있다면 폐기
    if [ -d /etc/letsencrypt/live ]; then
        mkdir -p /etc/letsencrypt/trash/$RENEW_DATE/live
        mv /etc/letsencrypt/live/* /etc/letsencrypt/trash/$RENEW_DATE/live
    fi

    if [ -d /etc/letsencrypt/archive ]; then
        mkdir -p /etc/letsencrypt/trash/$RENEW_DATE/archive
        mv /etc/letsencrypt/archive/* /etc/letsencrypt/trash/$RENEW_DATE/archive
    fi

    if [ -d /etc/letsencrypt/renewal ]; then
        mkdir -p /etc/letsencrypt/trash/$RENEW_DATE/renewal
        mv /etc/letsencrypt/renewal/* /etc/letsencrypt/trash/$RENEW_DATE/renewal
    fi

    if [ -d /etc/letsencrypt/cert ]; then
        mkdir -p /etc/letsencrypt/trash/$RENEW_DATE/cert
        mv /etc/letsencrypt/cert/* /etc/letsencrypt/trash/$RENEW_DATE/cert
    fi

    # certbot을 이용한 인증서 발급
    certbot certonly --non-interactive --agree-tos --email $SERVER_ADMIN_EMAIL --webroot -w /var/www/certbot -d $SERVER_DOMAIN
    if [ $? -ne 0 ]; then
        echo "Error: Certbot failed to issue the certificate."

        # 인증서 발급 실패 시, 백업된 기존 인증서 데이터 복구
        if [ -d /etc/letsencrypt/trash/$RENEW_DATE/live ]; then
            mkdir -p /etc/letsencrypt/live
            mv /etc/letsencrypt/trash/$RENEW_DATE/live/* /etc/letsencrypt/live
        fi

        if [ -d /etc/letsencrypt/trash/$RENEW_DATE/archive ]; then
            mkdir -p /etc/letsencrypt/archive
            mv /etc/letsencrypt/trash/$RENEW_DATE/archive/* /etc/letsencrypt/archive
        fi

        if [ -d /etc/letsencrypt/trash/$RENEW_DATE/renewal ]; then
            mkdir -p /etc/letsencrypt/renewal
            mv /etc/letsencrypt/trash/$RENEW_DATE/renewal/* /etc/letsencrypt/renewal
        fi

        if [ -d /etc/letsencrypt/trash/$RENEW_DATE/cert ]; then
            mkdir -p /etc/letsencrypt/cert
            mv /etc/letsencrypt/trash/$RENEW_DATE/cert/* /etc/letsencrypt/cert
        fi

        exit 1
    fi

    cp $CERT_DIR/* /etc/letsencrypt/cert
    chown 1000:1000 -R /etc/letsencrypt/cert

    echo "Certificate successfully issued."
    exit 0
fi

# 만료 알림 기간 (일 단위)
RENEW_THRESHOLD=30

# 현재 날짜와 인증서 만료 날짜 계산
DAYS_LEFT=0
if [ -f $FULLCHAIN ]; then
    EXPIRATION_DATE=$(openssl x509 -enddate -noout -in $FULLCHAIN | cut -d= -f2)
    EXPIRATION_EPOCH=$(date -d "$EXPIRATION_DATE" +%s)
    CURRENT_EPOCH=$(date +%s)
    DAYS_LEFT=$(( ($EXPIRATION_EPOCH - $CURRENT_EPOCH) / 86400 ))
fi

# 만료 여부 확인 및 갱신
if [ $DAYS_LEFT -le $RENEW_THRESHOLD ]; then
    echo "Certificate is expired or near expiration. Renewing certificate..."

    # certbot을 이용한 인증서 갱신
    certbot renew --non-interactive --agree-tos

    if [ $? -ne 0 ]; then
        echo "Error: Certbot failed to renew the certificate."
        exit 1
    fi

    echo "Certificate successfully renewed."
else
    echo "Certificate is valid for another $DAYS_LEFT days, no need to renew."
fi

echo "Done :)"
