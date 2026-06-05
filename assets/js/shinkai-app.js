// Shinkai App - 統合ログインページ

document.addEventListener('DOMContentLoaded', function() {
  const rememberedId = localStorage.getItem('shinkaiId');
  if (rememberedId) {
    document.getElementById('shinkaiId').value = rememberedId;
    document.getElementById('rememberId').checked = true;
  }

  document.getElementById('login-btn').addEventListener('click', function() {
    const id = document.getElementById('shinkaiId').value.trim();
    if (!id) {
      document.getElementById('error').textContent = 'Shinkai IDを入力してください。';
      return;
    }

    if (document.getElementById('rememberId').checked) {
      localStorage.setItem('shinkaiId', id);
    } else {
      localStorage.removeItem('shinkaiId');
    }

    window.location.href = `/shinkai/app/dashboard/?id=${encodeURIComponent(id)}`;
  });
});
