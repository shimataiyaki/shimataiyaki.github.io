// Shinkai Vision Planner - メインスクリプト
// GAS API URLはデプロイ後に差し替え（開発中はコメントアウト推奨）
const GAS_API_URL = 'https://script.google.com/macros/s/xxxxxxxxx/exec'; // TODO: デプロイ後に差し替え

// 開発中はモックモードで動作させるフラグ
const USE_MOCK = true; // 本番環境ではfalseに変更

// モック用のID生成関数
function generateMockShinkaiId(projType, projName) {
    const year = new Date().getFullYear();
    const typeCode = {
        'school': 'sch', 'club': 'clb', 'event': 'evt',
        'contest': 'cnt', 'volunteer': 'vol', 'startup': 'stp', 'other': 'oth'
    }[projType] || 'oth';
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `proj-${year}-${typeCode}-${randomNum}`;
}

// フォーム送信処理
document.getElementById('vision-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const resultSection = document.getElementById('result-section');
    const errorSection = document.getElementById('error-section');
    
    submitBtn.disabled = true;
    submitBtn.textContent = '作成中...';
    resultSection.style.display = 'none';
    errorSection.style.display = 'none';
    
    const formData = {
        projType: document.getElementById('proj-type').value,
        projName: document.getElementById('proj-name').value.trim(),
        vision: document.getElementById('vision').value.trim(),
        minSuccess: document.getElementById('min-success').value.trim(),
        outOfScope: document.getElementById('out-of-scope').value.trim() || '(未設定)'
    };
    
    // バリデーション
    if (!formData.projType || !formData.projName || !formData.vision || !formData.minSuccess) {
        document.getElementById('error-message').textContent = '必須項目（*印）をすべて入力してください。';
        errorSection.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'プロジェクトを作成する';
        return;
    }
    
    try {
        let result;
        
        if (USE_MOCK) {
            // モックモード：実際のAPIを呼ばずに成功レスポンスを模擬
            await new Promise(resolve => setTimeout(resolve, 800)); // 通信遅延を模擬
            result = {
                success: true,
                projId: generateMockShinkaiId(formData.projType, formData.projName)
            };
        } else {
            // 本番モード：GAS APIを呼び出し
            const response = await fetch(GAS_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            result = await response.json();
        }
        
        if (result.success) {
            document.getElementById('shinkai-id-display').textContent = result.projId;
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth' });
            // フォームをリセット
            document.getElementById('vision-form').reset();
        } else {
            throw new Error(result.message || '不明なエラー');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 
            error.message || 'サーバーとの通信に失敗しました。しばらく経ってからお試しください。';
        errorSection.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'プロジェクトを作成する';
    }
});

// ChatGPT相談機能
document.addEventListener('DOMContentLoaded', function() {
    const chatBtn = document.getElementById('chatgpt-advice-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            const projType = document.getElementById('proj-type')?.options?.[document.getElementById('proj-type')?.selectedIndex]?.text || '';
            const projName = document.getElementById('proj-name')?.value.trim() || '';
            const vision = document.getElementById('vision').value.trim();
            const minSuccess = document.getElementById('min-success').value.trim();
            const outOfScope = document.getElementById('out-of-scope').value.trim() || '（未入力）';
            
            if (!vision || !minSuccess) {
                alert('相談する前に「ビジョン」と「及第点」を入力してください。');
                return;
            }
            
            const prompt = `以下のプロジェクト情報を、プロジェクト設計の専門家として評価し、改善点を簡潔に教えてください。

【プロジェクトタイプ】${projType || '未選択'}
【プロジェクト名】${projName || '未入力'}
【ビジョン】${vision}
【及第点】${minSuccess}
【明確にやらないこと】${outOfScope}

評価観点：
- ビジョンは「誰の課題を解決するか」明確か？
- 及第点は適切か？
- 「やらないこと」と矛盾はないか？

3〜5つのポイントで簡潔に。`;
            
            window.open(`https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`, '_blank');
        });
    }
    
    // デバッグ情報（開発中のみ表示）
    if (USE_MOCK) {
        console.log('🔧 モックモードで動作中（GAS未連携）');
        const notice = document.createElement('div');
        notice.textContent = '🔧 開発中モード：GAS連携なしでテスト中です';
        notice.style.cssText = 'position:fixed; bottom:10px; right:10px; background:#f0f0f0; padding:4px 10px; border-radius:20px; font-size:12px; color:#666; z-index:9999;';
        document.body.appendChild(notice);
    }
});
