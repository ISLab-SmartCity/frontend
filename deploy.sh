#!/bin/bash

# 기존 컨테이너 확인
CONTAINER_ID=$(docker ps -q -f name=web)

if [ -n "$CONTAINER_ID" ]; then
    echo "기존 컨테이너가 실행 중입니다. 무중단 배포를 시작합니다."
    
    # 새로운 이미지 빌드
    docker-compose build
    
    # 새로운 컨테이너 실행 (임시 포트 사용)
    docker-compose up -d --scale web=2 --no-recreate
    
    # 기존 컨테이너 종료
    docker stop $CONTAINER_ID
    docker rm $CONTAINER_ID
    
    echo "무중단 배포가 완료되었습니다."
else
    echo "새로운 배포를 시작합니다."
    
    # 도커 컴포즈로 빌드 및 실행
    docker-compose up -d --build
    
    echo "배포가 완료되었습니다."
fi

# 사용하지 않는 이미지 정리
docker image prune -f
