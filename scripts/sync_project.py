import os
import subprocess
import sys

def run_command(command, cwd=None):
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True, cwd=cwd)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Hata: {e.stderr}")
        return None

def sync():
    project_path = "/home/ubuntu/zuhre_planet_git_work"
    
    if not os.path.exists(project_path):
        print(f"Proje yolu bulunamadı: {project_path}")
        return

    print("🔄 Senkronizasyon başlatılıyor...")
    
    # Git durumunu kontrol et
    status = run_command("git status --porcelain", cwd=project_path)
    
    if not status:
        print("✅ Her şey güncel, yapılacak işlem yok.")
        return

    print("📝 Değişiklikler algılandı, GitHub'a yükleniyor...")
    
    # Değişiklikleri ekle ve commit et
    run_command("git add .", cwd=project_path)
    commit_msg = "Auto-sync: Project updated with latest changes"
    run_command(f'git commit -m "{commit_msg}"', cwd=project_path)
    
    # Push et
    push_result = run_command("git push origin main || git push origin master", cwd=project_path)
    
    if push_result is not None:
        print("🚀 Başarıyla GitHub'a yüklendi!")
    else:
        print("❌ Push işlemi başarısız oldu.")

if __name__ == "__main__":
    sync()
