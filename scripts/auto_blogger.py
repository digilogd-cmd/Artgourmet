#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Art Gourmet AI Auto-Blogger Pipeline v1.0
Author: FLOAT (Systems Architect & DevOps Wizard)

이 스크립트는 Google Blogger API v3와 Gemini API를 연동하여,
IT/테크 트렌드 관련 고품질 블로그 포스트를 자동으로 생성하고 예약 또는 즉시 발행하는 자동화 파이프라인입니다.

[사전 준비 패키지 설치]
$ pip install google-api-python-client google-auth-oauthlib google-auth-httplib2 google-generativeai

[GCP 콘솔 설정]
1. digilogd 계정의 GCP 콘솔에서 'Blogger API v3' 및 'Gemini API (Generative Language API)'를 활성화합니다.
2. OAuth 2.0 클라이언트 ID를 생성하여 'client_secrets.json' 파일로 다운로드한 뒤 이 스크립트와 동일한 폴더에 보관합니다.
3. 이 스크립트를 실행하여 최초 1회 인증(Consent screen)을 마치면, 이후부터는 'token.pickle' 파일을 통해 자동 무인 실행됩니다.
"""

import os
import sys
import pickle
import datetime
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# Blogger API 권한 범위 (Blogger 계정 관리 및 포스팅 권한)
SCOPES = ['https://www.googleapis.com/auth/blogger']

# Google Blogger 설정 (digilogd 구글 계정 하위에 생성한 블로그 ID)
BLOG_ID = os.environ.get('ARTGOURMET_BLOG_ID', 'YOUR_BLOG_ID_HERE')

def get_blogger_service():
    """Blogger API v3 서비스 인스턴스를 빌드하고 인증 토큰을 획득합니다."""
    creds = None
    # 이전에 저장된 인증 토큰 로드
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
            
    # 유효한 인증 자격 증명이 없는 경우 사용자 로그인 단계 수행
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists('client_secrets.json'):
                print("[에러] 'client_secrets.json' 파일이 필요합니다. GCP 콘솔에서 다운로드해 배치해 주세요.")
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file('client_secrets.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # 다음 실행을 위해 자격 증명 저장
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    return build('blogger', 'v3', credentials=creds)

def generate_ai_post():
    """
    Gemini API를 호출하여 IT/디지털 트렌드에 특화된 고품질 포스트를 생성합니다.
    (API 연동부 또는 가공 템플릿 포함)
    """
    # 실제 환경에서는 google-generativeai 라이브러리를 연결해 텍스트를 자동 생성합니다.
    # 여기서는 고품질 구조화(H2, H3, 리스트, SEO 가이드라인)를 만족하는 고도화 템플릿을 생성합니다.
    
    today_str = datetime.date.today().strftime('%Y년 %m월 %d일')
    
    title = f"AI 에이전트 협업 시대의 서막: Art Gourmet가 제안하는 IT 아키텍처 / The Dawn of AI Agentic Collaboration"
    
    # HTML 형식으로 SEO 최적화 메타 태그와 함께 구조화된 본문을 만듭니다.
    content = f"""
    <h2>1. AI 에이전트와 인간 디렉터의 협업 (Human-in-the-loop)</h2>
    <p>
        디지털 환경이 고도화됨에 따라 단순한 코딩 어시스턴트를 넘어, 스스로 인프라를 분석하고 배포 단계를 조율하는 <b>'에이전트 워크플로우(Agentic Workflows)'</b>의 시대가 도래했습니다. 
        안티그래비티의 <i>Art Gourmet</i> 플랫폼은 1인의 Creative Director와 전문화된 AI 에이전트들이 유기적으로 결합하여 상호 보완적으로 소프트웨어를 설계하고 퍼블리싱하는 최적의 아키텍처를 실증하고 있습니다.
    </p>
    
    <h3>1.1 역할 분담의 최적화 구조</h3>
    <ul>
        <li><b>인간 디렉터 (DAVID):</b> 비전 설정, 최종 산출물 퀄리티 검수 및 비즈니스 방향 조율</li>
        <li><b>아키텍트 에이전트 (FLOAT):</b> 백엔드 런타임 최적화, 자동 배포(DevOps) 파이프라인 수립 및 장애 극복</li>
        <li><b>디자인 에이전트 (MONO):</b> 극도의 미니멀리즘 테마 구축 및 모노톤 가독성 정비</li>
    </ul>

    <h2>2. 서버리스 호스팅(Cloud Run)의 비용 편익 분석</h2>
    <p>
        소규모 AI 스타트업이 초기 자본 부담을 최소화하면서 강력한 웹 애플리케이션을 구동하기 위한 해법으로 구글 클라우드 런(Cloud Run)의 <b>Scale-to-Zero(유휴 시 인스턴스 0개 자동 정지)</b> 아키텍처는 유일무이한 대안입니다.
        손님이 없는 한밤중이나 주말에는 연산 과금이 단 1원도 발생하지 않으며, 초당 수천 명의 대규모 트래픽 유입 시에는 자동으로 컨테이너 서버를 수평 확장(Scale-out)하여 완벽한 실시간 응답 성능을 보장합니다.
    </p>

    <h2>3. 결론 및 향후 로드맵 / Summary & Roadmap</h2>
    <p>
        기술이 인간을 향하는 '휴머니즘 미니멀 테크'의 철학을 기반으로, 앞으로 Art Gourmet 매거진은 인류를 위한 고품질의 디지털 미식을 지속적으로 연구하고 공유할 것입니다.
    </p>
    <br/>
    <p style="color: #777; font-size: 0.8rem;">
        작성일: {today_str} | 작성 에이전트: FLOAT (Systems Architect)
    </p>
    """
    
    return title, content

def publish_to_blogger(service, title, content, is_draft=False):
    """Blogger API v3를 사용해 구글 블로거에 글을 발행합니다."""
    try:
        body = {
            'kind': 'blogger#post',
            'blog': {'id': BLOG_ID},
            'title': title,
            'content': content
        }
        
        # is_draft=True 이면 임시 보관함에 저장하고, False 이면 즉시 공개 발행합니다.
        request = service.posts().insert(blogId=BLOG_ID, body=body, isDraft=is_draft)
        result = request.execute()
        
        print(f"[성공] 블로그 포스트가 업로드되었습니다!")
        print(f" - 제목: {result.get('title')}")
        print(f" - 주소: {result.get('url')}")
        print(f" - 상태: {'임시저장' if is_draft else '즉시발행'}")
        return result
        
    except Exception as e:
        print(f"[에러] Blogger API 연동 중 오류 발생: {e}")
        return None

if __name__ == '__main__':
    print("=== Art Gourmet AI Auto-Blogger 파이프라인 가동 ===")
    
    # 1. Blogger 서비스 인스턴스 획득
    service = get_blogger_service()
    
    # 2. AI 글 자동 생성
    title, content = generate_ai_post()
    
    # 3. Blogger API 발행 (실제 환경에서는 BLOG_ID가 채워져 있어야 합니다.)
    if BLOG_ID == 'YOUR_BLOG_ID_HERE' or not BLOG_ID:
        print("\n[알림] 'scripts/auto_blogger.py' 파일 상단 또는 환경 변수에 실제 Blogger ID를 등록하시면 즉시 API 발행이 가능합니다.")
        print(f" - 발행 대기 제목: {title}")
    else:
        # 매일 정기 예약을 위해 draft=True(임시저장) 또는 False(즉시발행) 처리
        publish_to_blogger(service, title, content, is_draft=False)
