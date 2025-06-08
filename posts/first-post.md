---
title: "GA4 + SQL을 활용한 캠페인 성과 분석"
date: "2025-06-08"
category: "Marketing"
thumbnail: "/posts-thumbnail/3d-fire.png"
---

GA4와 SQL을 활용한 퍼포먼스 마케팅 분석은 단순 클릭 수치를 넘어, **사용자 행동 기반의 실질적 전환 지표**를 도출하는 데 중점을 두고 있습니다.

## 📈 분석 개요

- **분석 기간**: 2024년 10월 1일 ~ 10월 31일
- **분석 대상 캠페인**: '시력교정 수술' 키워드 기반 유입
- **데이터 출처**: GA4 → BigQuery 연동 → SQL 분석

## 🔍 핵심 분석 항목

- 유입 경로별 전환율
- 랜딩 페이지별 이탈률
- 캠페인별 평균 체류 시간
- 신규 vs 재방문 사용자 행동 패턴

## 📊 SQL 분석 예시

```sql
SELECT
  traffic_source.name AS channel,
  COUNT(DISTINCT user_pseudo_id) AS users,
  COUNTIF(event_name = 'purchase') AS purchases,
  ROUND(COUNTIF(event_name = 'purchase') / COUNT(DISTINCT user_pseudo_id), 3) AS conversion_rate
FROM `project.analytics_123456789.events_*`
WHERE _TABLE_SUFFIX BETWEEN '20241001' AND '20241031'
  AND traffic_source.name IS NOT NULL
GROUP BY channel
ORDER BY conversion_rate DESC;

```
