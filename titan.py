import time
import subprocess
import psutil

def is_script_running(script_name):
    for proc in psutil.process_iter(['pid', 'name']):
        if script_name in proc.info['name']:
            return True
    return False

while True:
    if not is_script_running('main.py'):
        subprocess.run(['python3', 'main.py'])  # Замените на путь к вашему скрипту
    time.sleep(5)  # Ожидаем 5 секунд
