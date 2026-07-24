# -*- coding: utf-8 -*-
"""Тянет новости и анонсы с kuban.tpprf.ru и качает картинки новостей.

Запуск из каталога web/:  python scripts/fetch_news.py
Пишет: src/data/news.json, src/data/announcements.json, public/news-img/*.jpg
Используется локально и в GitHub Actions (deploy.yml).
"""
import html
import json
import os
import re
import urllib.request

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0 (tppit-build)'}
BASE = 'https://kuban.tpprf.ru'
NEWS_LIMIT = 9
ANN_LIMIT = 12
IMG_DIR = 'public/news-img'


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=25).read().decode('utf-8', 'replace')


def fetch_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=25).read()


def tag(block: str, name: str) -> str:
    m = re.search(rf'<{name}>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</{name}>', block, re.S)
    return html.unescape(m.group(1).strip()) if m else ''


def news_image(page_url: str, news_id: str) -> str | None:
    """Первая контентная картинка новости → public/news-img/<id>.jpg"""
    try:
        raw = fetch(page_url)
    except Exception as e:
        print(f'  img page ERR {page_url}: {e}')
        return None
    for src in re.findall(r'<img[^>]+src="(/upload/[^"]+)"', raw):
        if src.lower().endswith(('.jpg', '.jpeg', '.png')):
            try:
                data = fetch_bytes(BASE + src)
            except Exception as e:
                print(f'  img dl ERR {src}: {e}')
                continue
            if len(data) < 5000:  # иконки/заглушки не берём
                continue
            os.makedirs(IMG_DIR, exist_ok=True)
            ext = 'png' if src.lower().endswith('.png') else 'jpg'
            fname = f'{news_id}.{ext}'
            with open(os.path.join(IMG_DIR, fname), 'wb') as f:
                f.write(data)
            return f'news-img/{fname}'
    return None


def main() -> None:
    # --- новости из RSS + картинки со страниц ---
    raw = fetch(BASE + '/ru/news/?RSS')
    items = []
    for m in re.finditer(r'<item>(.*?)</item>', raw, re.S):
        b = m.group(1)
        link = tag(b, 'link')
        nid = (re.search(r'/news/(\d+)/', link) or [None, 'x'])[1]
        items.append({
            'title': tag(b, 'title'),
            'link': link,
            'date': tag(b, 'pubDate'),
            'desc': re.sub(r'<[^>]+>', '', tag(b, 'description'))[:220].strip(),
            'img': None,
            '_id': nid,
        })
    items = items[:NEWS_LIMIT]
    for it in items:
        it['img'] = news_image(it['link'], it['_id'])
        del it['_id']
        print('news:', it['title'][:50], '| img:', it['img'])
    if items:
        with open('src/data/news.json', 'w', encoding='utf-8') as f:
            json.dump(items, f, ensure_ascii=False, indent=1)

    # --- анонсы: RSS нет, парсим листинг ---
    raw2 = fetch(BASE + '/ru/announcements/')
    ann, seen = [], set()
    for m in re.finditer(r'<a[^>]+href="(/ru/announcements/(\d+)/)"[^>]*>(.*?)</a>', raw2, re.S):
        title = ' '.join(html.unescape(re.sub(r'<[^>]+>', ' ', m.group(3))).split())
        if not title or len(title) < 8 or m.group(1) in seen:
            continue
        seen.add(m.group(1))
        dm = re.findall(r'(\d{2}\.\d{2}\.\d{4})', raw2[max(0, m.start() - 600):m.start()])
        ann.append({'title': title, 'link': BASE + m.group(1), 'date': dm[-1] if dm else ''})
    if ann:
        with open('src/data/announcements.json', 'w', encoding='utf-8') as f:
            json.dump(ann[:ANN_LIMIT], f, ensure_ascii=False, indent=1)
    print(f'announcements: {len(ann[:ANN_LIMIT])}')


if __name__ == '__main__':
    main()
