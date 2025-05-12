import os

# Укажи свой домен и папку на ПК, где лежат файлы сайта
domain = "https://igry-apk.ru"
site_folder = "C:\\Users\\Titan\\Desktop\\САЙТ1"  # например: "C:/Users/Титан/site"

sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

for subdir, _, files in os.walk(site_folder):
    for file in files:
        if file.endswith(".html"):
            rel_path = os.path.relpath(os.path.join(subdir, file), site_folder)
            rel_path = rel_path.replace(os.sep, '/')
            url = f"{domain}/{rel_path}"
            sitemap.append(f"<url><loc>{url}</loc></url>")

sitemap.append('</urlset>')

with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write("\n".join(sitemap))

print("Sitemap.xml создана!")
