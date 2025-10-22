<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>検査データ参照アプリ | Nurse Path+</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        const { useState, useEffect } = React;
        
        // Lucide Reactアイコンの代替（シンプルなSVG）
        const Search = () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
        );
        
        const Heart = ({ size = 22, fill = 'none', color = '#94a3b8' }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        );
        
        const ChevronDown = ({ size = 24, color = '#64748b' }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        );
        
        const ChevronUp = ({ size = 24, color = '#64748b' }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        );
        
        const AlertCircle = ({ size = 16 }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        );
        
        const TrendingUp = ({ size = 18, color = '#ef4444' }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
        );
        
        const TrendingDown = ({ size = 18, color = '#3b82f6' }) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
            </svg>
        );

        const LabDataApp = () => {
          const [searchTerm, setSearchTerm] = useState('');
          const [expandedItem, setExpandedItem] = useState(null);
          const [favorites, setFavorites] = useState([]);
          const [activeCategory, setActiveCategory] = useState('all');

          useEffect(() => {
            const saved = localStorage.getItem('labFavorites');
            if (saved) {
              setFavorites(JSON.parse(saved));
            }
          }, []);

          const toggleFavorite = (id) => {
            const newFavorites = favorites.includes(id)
              ? favorites.filter(fav => fav !== id)
              : [...favorites, id];
            setFavorites(newFavorites);
            localStorage.setItem('labFavorites', JSON.stringify(newFavorites));
          };

          const labData = [
            {
              id: 'wbc',
              category: 'cbc',
              categoryName: 'CBC(血算)',
              name: 'WBC',
              fullName: '白血球数',
              unit: '/μL',
              normal: '3,300～8,600',
              emergency: '< 1,000 または > 30,000',
              high: {
                meaning: '感染症、炎症、白血病',
                signs: '発熱、倦怠感'
              },
              low: {
                meaning: '骨髄抑制、薬剤性',
                signs: '易感染性、発熱'
              },
              assessment: '感染徴候の有無、免疫状態の評価が重要',
              record: 'WBC 12,500/μL↑ 発熱38.5℃あり、創部発赤(+)、感染徴候として観察継続'
            },
            {
              id: 'hb',
              category: 'cbc',
              categoryName: 'CBC(血算)',
              name: 'Hb',
              fullName: 'ヘモグロビン',
              unit: 'g/dL',
              normal: '男性:13.7～16.8、女性:11.6～14.8',
              emergency: '< 7.0',
              high: {
                meaning: '多血症、脱水',
                signs: '頭痛、めまい'
              },
              low: {
                meaning: '貧血',
                signs: '動悸、息切れ、倦怠感'
              },
              assessment: '貧血の重症度評価。Hb<7は輸血適応の可能性',
              record: 'Hb 8.5g/dL↓ 動悸・息切れあり、ADL時に休息必要、貧血症状観察継続'
            },
            {
              id: 'plt',
              category: 'cbc',
              categoryName: 'CBC(血算)',
              name: 'PLT',
              fullName: '血小板数',
              unit: '×10⁴/μL',
              normal: '15.8～34.8',
              emergency: '< 2.0 または > 100',
              high: {
                meaning: '骨髄増殖性疾患',
                signs: '血栓リスク増大'
              },
              low: {
                meaning: '血小板減少症、DIC',
                signs: '出血傾向、紫斑'
              },
              assessment: 'PLT<5万で出血リスク、<2万で重篤な出血リスク',
              record: 'PLT 3.2×10⁴/μL↓ 皮下出血斑あり、出血傾向として転倒予防実施'
            },
            {
              id: 'k',
              category: 'electrolyte',
              categoryName: '電解質',
              name: 'K',
              fullName: 'カリウム',
              unit: 'mEq/L',
              normal: '3.6～4.8',
              emergency: '< 3.0 または > 6.0',
              high: {
                meaning: '腎不全、アシドーシス',
                signs: '不整脈、筋力低下'
              },
              low: {
                meaning: '利尿薬、下痢、嘔吐',
                signs: '脱力、不整脈、腸蠕動低下'
              },
              assessment: 'K異常は致死的不整脈のリスク。緊急値は即報告',
              record: 'K 5.8mEq/L↑ 心電図モニター装着、不整脈出現なし、腎機能評価実施'
            },
            {
              id: 'crp',
              category: 'nutrition',
              categoryName: '栄養・炎症',
              name: 'CRP',
              fullName: 'C反応性蛋白',
              unit: 'mg/dL',
              normal: '< 0.14',
              emergency: '> 20',
              high: {
                meaning: '感染症、炎症性疾患',
                signs: '発熱、倦怠感'
              },
              low: {
                meaning: '正常',
                signs: '-'
              },
              assessment: '炎症の程度・治療効果判定に有用。感染症で数時間で上昇',
              record: 'CRP 8.5mg/dL↑ 発熱38.8℃、感染症疑い、抗菌薬投与開始、経過観察'
            },
            {
              id: 'bs',
              category: 'glucose',
              categoryName: '血糖',
              name: '血糖値',
              fullName: '血糖',
              unit: 'mg/dL',
              normal: '空腹時: 70～109',
              emergency: '< 70 または > 250',
              high: {
                meaning: '糖尿病、ステロイド',
                signs: '口渇、多尿、倦怠感'
              },
              low: {
                meaning: 'インスリン過量、絶食',
                signs: '冷汗、動悸、意識障害'
              },
              assessment: '低血糖<70は緊急対応。高血糖>250で脱水・ケトアシドーシスリスク',
              record: '血糖値 58mg/dL↓ 冷汗・手指振戦あり、ブドウ糖10g摂取後70mg/dLに改善'
            }
          ];

          const categories = [
            { id: 'all', name: 'すべて', color: '#6366f1' },
            { id: 'cbc', name: 'CBC(血算)', color: '#ef4444' },
            { id: 'electrolyte', name: '電解質', color: '#3b82f6' },
            { id: 'nutrition', name: '栄養・炎症', color: '#8b5cf6' },
            { id: 'glucose', name: '血糖', color: '#14b8a6' }
          ];

          const filteredData = labData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 item.fullName.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            return matchesSearch && matchesCategory;
          });

          return (
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '24px 16px',
                color: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
                    検査データ参照アプリ
                  </h1>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>
                    実習で使える検査値リファレンス
                  </p>
                </div>
              </div>

              <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                    <Search />
                  </div>
                  <input
                    type="text"
                    placeholder="検査項目を検索（例：WBC、ヘモグロビン）"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 48px',
                      fontSize: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      outline: 'none',
                      backgroundColor: 'white'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        backgroundColor: activeCategory === cat.id ? cat.color : 'white',
                        color: activeCategory === cat.id ? 'white' : '#64748b',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  {filteredData.map((item) => {
                    const isExpanded = expandedItem === item.id;
                    const isFavorite = favorites.includes(item.id);
                    const category = categories.find(c => c.id === item.category);

                    return (
                      <div
                        key={item.id}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '12px',
                          padding: '20px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          cursor: 'pointer'
                        }}
                      >
                        <div 
                          onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                              <span style={{
                                padding: '4px 12px',
                                backgroundColor: category.color,
                                color: 'white',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '600'
                              }}>
                                {item.categoryName}
                              </span>
                              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                                {item.name}
                              </h3>
                            </div>
                            <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 8px 0' }}>
                              {item.fullName}
                            </p>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                              <span style={{ color: '#10b981', fontWeight: '600' }}>
                                基準値: {item.normal} {item.unit}
                              </span>
                              <span style={{ color: '#ef4444', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <AlertCircle />
                                緊急: {item.emergency}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(item.id);
                              }}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
                            >
                              <Heart fill={isFavorite ? '#ef4444' : 'none'} color={isFavorite ? '#ef4444' : '#94a3b8'} />
                            </button>
                            {isExpanded ? <ChevronUp /> : <ChevronDown />}
                          </div>
                        </div>

                        {isExpanded && (
                          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #f1f5f9' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '16px', marginBottom: '20px' }}>
                              <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '2px solid #fee2e2' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                  <TrendingUp />
                                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#dc2626', margin: 0 }}>
                                    高値の場合
                                  </h4>
                                </div>
                                <p style={{ fontSize: '14px', color: '#7f1d1d', margin: '0 0 8px 0', fontWeight: '600' }}>
                                  {item.high.meaning}
                                </p>
                                <p style={{ fontSize: '13px', color: '#991b1b', margin: 0 }}>
                                  症状: {item.high.signs}
                                </p>
                              </div>

                              <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '2px solid #dbeafe' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                  <TrendingDown />
                                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1d4ed8', margin: 0 }}>
                                    低値の場合
                                  </h4>
                                </div>
                                <p style={{ fontSize: '14px', color: '#1e3a8a', margin: '0 0 8px 0', fontWeight: '600' }}>
                                  {item.low.meaning}
                                </p>
                                <p style={{ fontSize: '13px', color: '#1e40af', margin: 0 }}>
                                  症状: {item.low.signs}
                                </p>
                              </div>
                            </div>

                            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '2px solid #dcfce7', marginBottom: '16px' }}>
                              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#15803d', marginBottom: '8px' }}>
                                📋 アセスメントポイント
                              </h4>
                              <p style={{ fontSize: '14px', color: '#166534', margin: 0, lineHeight: '1.6' }}>
                                {item.assessment}
                              </p>
                            </div>

                            <div style={{ padding: '16px', backgroundColor: '#fefce8', borderRadius: '8px', border: '2px solid #fef9c3' }}>
                              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#a16207', marginBottom: '8px' }}>
                                ✏️ 記録例
                              </h4>
                              <p style={{ fontSize: '14px', color: '#713f12', margin: 0, lineHeight: '1.6', fontStyle: 'italic' }}>
                                {item.record}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '40px', padding: '24px', backgroundColor: 'white', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <p style={{ fontSize: '16px', color: '#1e293b', marginBottom: '8px', fontWeight: '600' }}>
                    最新の看護実習情報・国試対策情報をお届け！
                  </p>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                    公式LINEで役立つコンテンツを配信中
                  </p>
                  <a 
                    href="https://lin.ee/NhhFjUb"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '14px 32px',
                      background: 'linear-gradient(135deg, #06C755 0%, #00B900 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '16px',
                      fontWeight: '700',
                      textDecoration: 'none'
                    }}>
                    📱 公式LINEで最新情報をチェック
                  </a>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
                    Nurse Path+ by かず学長
                  </p>
                </div>
              </div>
            </div>
          );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<LabDataApp />);
    </script>
</body>
</html>
