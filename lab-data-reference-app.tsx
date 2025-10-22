import React, { useState, useEffect } from 'react';
import { Search, Heart, ChevronDown, ChevronUp, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

const LabDataApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // LocalStorageからお気に入りを読み込み
  useEffect(() => {
    const saved = localStorage.getItem('labFavorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // お気に入りを保存
  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('labFavorites', JSON.stringify(newFavorites));
  };

  // 検査データ
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
      id: 'rbc',
      category: 'cbc',
      categoryName: 'CBC(血算)',
      name: 'RBC',
      fullName: '赤血球数',
      unit: '×10⁴/μL',
      normal: '男性:430～570、女性:380～500',
      emergency: '< 200',
      high: {
        meaning: '多血症、脱水',
        signs: 'チアノーゼ、頭痛'
      },
      low: {
        meaning: '貧血',
        signs: '倦怠感、動悸、めまい'
      },
      assessment: 'Hb・Htと併せて貧血の程度を評価',
      record: 'RBC 350×10⁴/μL↓ 顔色不良、易疲労感あり、貧血症状として観察'
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
      id: 'ht',
      category: 'cbc',
      categoryName: 'CBC(血算)',
      name: 'Ht',
      fullName: 'ヘマトクリット',
      unit: '%',
      normal: '男性:40.7～50.1、女性:35.1～44.4',
      emergency: '< 20',
      high: {
        meaning: '脱水、多血症',
        signs: 'チアノーゼ'
      },
      low: {
        meaning: '貧血、出血',
        signs: '倦怠感、蒼白'
      },
      assessment: '血液の濃縮度を示す。脱水と貧血の鑑別に有用',
      record: 'Ht 32.0%↓ 顔色不良、皮膚乾燥あり、水分バランス・貧血状態を評価'
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
      id: 'ast',
      category: 'liver',
      categoryName: '肝機能',
      name: 'AST',
      fullName: 'アスパラギン酸アミノトランスフェラーゼ',
      unit: 'U/L',
      normal: '13～30',
      emergency: '> 500',
      high: {
        meaning: '肝障害、心筋梗塞、筋疾患',
        signs: '黄疸、倦怠感'
      },
      low: {
        meaning: '臨床的意義少ない',
        signs: '-'
      },
      assessment: 'ALTと比較。AST>ALTでアルコール性、AST<ALTでウイルス性',
      record: 'AST 125U/L↑ 倦怠感あり、飲酒歴確認、肝機能障害として経過観察'
    },
    {
      id: 'alt',
      category: 'liver',
      categoryName: '肝機能',
      name: 'ALT',
      fullName: 'アラニンアミノトランスフェラーゼ',
      unit: 'U/L',
      normal: '男性:10～42、女性:7～23',
      emergency: '> 500',
      high: {
        meaning: '肝障害(肝炎、脂肪肝)',
        signs: '黄疸、食欲不振'
      },
      low: {
        meaning: '臨床的意義少ない',
        signs: '-'
      },
      assessment: '肝細胞障害の指標。ASTより肝特異性が高い',
      record: 'ALT 98U/L↑ 脂肪肝疑い、食事指導実施、定期的な検査フォロー必要'
    },
    {
      id: 'ggt',
      category: 'liver',
      categoryName: '肝機能',
      name: 'γ-GTP',
      fullName: 'ガンマグルタミルトランスペプチダーゼ',
      unit: 'U/L',
      normal: '男性:13～64、女性:9～32',
      emergency: '> 500',
      high: {
        meaning: 'アルコール性肝障害、胆道系疾患',
        signs: '黄疸、右季肋部痛'
      },
      low: {
        meaning: '臨床的意義少ない',
        signs: '-'
      },
      assessment: 'アルコール摂取の指標。胆道系疾患のスクリーニング',
      record: 'γ-GTP 215U/L↑ 飲酒習慣あり、節酒指導実施、肝保護の生活指導'
    },
    {
      id: 'bun',
      category: 'renal',
      categoryName: '腎機能',
      name: 'BUN',
      fullName: '血中尿素窒素',
      unit: 'mg/dL',
      normal: '8～20',
      emergency: '> 100',
      high: {
        meaning: '腎機能障害、脱水、消化管出血',
        signs: '浮腫、尿量減少'
      },
      low: {
        meaning: '肝不全、低栄養',
        signs: '筋力低下'
      },
      assessment: 'Crと併せて評価。BUN/Cr比で脱水・腎性の鑑別',
      record: 'BUN 45mg/dL↑ 尿量700mL/日↓、脱水傾向あり、水分摂取促進'
    },
    {
      id: 'cr',
      category: 'renal',
      categoryName: '腎機能',
      name: 'Cr',
      fullName: 'クレアチニン',
      unit: 'mg/dL',
      normal: '男性:0.65～1.07、女性:0.46～0.79',
      emergency: '> 5.0',
      high: {
        meaning: '腎機能障害',
        signs: '浮腫、高血圧、尿毒症症状'
      },
      low: {
        meaning: '筋肉量減少',
        signs: 'るい痩'
      },
      assessment: 'eGFRと併せて腎機能を総合評価',
      record: 'Cr 2.1mg/dL↑ 浮腫(+)、高血圧あり、腎機能低下として水分・塩分管理'
    },
    {
      id: 'egfr',
      category: 'renal',
      categoryName: '腎機能',
      name: 'eGFR',
      fullName: '推算糸球体濾過量',
      unit: 'mL/分/1.73m²',
      normal: '≧ 60',
      emergency: '< 15',
      high: {
        meaning: '正常または過濾過',
        signs: '-'
      },
      low: {
        meaning: 'CKD(慢性腎臓病)',
        signs: '浮腫、高血圧'
      },
      assessment: 'CKDステージ分類: G3a(45-59)、G3b(30-44)、G4(15-29)、G5(<15)',
      record: 'eGFR 38mL/分↓ CKD G3b相当、腎保護食(低蛋白・減塩)開始'
    },
    {
      id: 'na',
      category: 'electrolyte',
      categoryName: '電解質',
      name: 'Na',
      fullName: 'ナトリウム',
      unit: 'mEq/L',
      normal: '138～145',
      emergency: '< 120 または > 160',
      high: {
        meaning: '脱水、高張性脱水',
        signs: '口渇、意識障害'
      },
      low: {
        meaning: 'SIADH、心不全、利尿薬',
        signs: '倦怠感、意識障害、痙攣'
      },
      assessment: '体液量と併せて評価。急激な補正は危険',
      record: 'Na 128mEq/L↓ 倦怠感・意識レベル軽度低下、低Na血症として緩徐な補正'
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
      id: 'cl',
      category: 'electrolyte',
      categoryName: '電解質',
      name: 'Cl',
      fullName: 'クロール',
      unit: 'mEq/L',
      normal: '101～108',
      emergency: '< 80 または > 120',
      high: {
        meaning: '脱水、代謝性アシドーシス',
        signs: '口渇'
      },
      low: {
        meaning: '嘔吐、利尿薬、代謝性アルカローシス',
        signs: '筋痙攣'
      },
      assessment: 'Na・Kと併せて電解質バランスを総合評価',
      record: 'Cl 95mEq/L↓ 嘔吐頻回、脱水補正と電解質補正実施中'
    },
    {
      id: 'tp',
      category: 'nutrition',
      categoryName: '栄養・炎症',
      name: 'TP',
      fullName: '総蛋白',
      unit: 'g/dL',
      normal: '6.6～8.1',
      emergency: '< 4.0',
      high: {
        meaning: '脱水、多発性骨髄腫',
        signs: '浮腫'
      },
      low: {
        meaning: '低栄養、肝障害、ネフローゼ',
        signs: '浮腫、筋力低下'
      },
      assessment: 'Albと併せて栄養状態評価',
      record: 'TP 5.2g/dL↓ 食事摂取不良、浮腫あり、栄養介入必要'
    },
    {
      id: 'alb',
      category: 'nutrition',
      categoryName: '栄養・炎症',
      name: 'Alb',
      fullName: 'アルブミン',
      unit: 'g/dL',
      normal: '4.1～5.1',
      emergency: '< 2.5',
      high: {
        meaning: '脱水',
        signs: '口渇'
      },
      low: {
        meaning: '低栄養、肝障害、炎症',
        signs: '浮腫、褥瘡リスク'
      },
      assessment: '3.5以下で軽度、3.0以下で中等度、2.5以下で高度低栄養',
      record: 'Alb 2.8g/dL↓ 浮腫(+++)、褥瘡発生リスク高、高蛋白食・栄養補助実施'
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
      id: 'pt',
      category: 'coagulation',
      categoryName: '凝固系',
      name: 'PT',
      fullName: 'プロトロンビン時間',
      unit: '秒',
      normal: '10～13',
      emergency: '> 20',
      high: {
        meaning: '肝障害、ワーファリン過量',
        signs: '出血傾向'
      },
      low: {
        meaning: '血栓傾向',
        signs: '血栓症'
      },
      assessment: '外因系凝固能評価。ワーファリン効果モニタリング',
      record: 'PT 18秒↑ 歯肉出血あり、ワーファリン投与量調整必要'
    },
    {
      id: 'pt-inr',
      category: 'coagulation',
      categoryName: '凝固系',
      name: 'PT-INR',
      fullName: 'プロトロンビン時間国際標準比',
      unit: '',
      normal: '0.9～1.1',
      emergency: '> 5.0',
      high: {
        meaning: 'ワーファリン過量、肝障害',
        signs: '出血傾向、紫斑'
      },
      low: {
        meaning: 'ワーファリン不足',
        signs: '血栓リスク'
      },
      assessment: 'ワーファリン治療域: 心房細動2.0-3.0、人工弁2.5-3.5',
      record: 'PT-INR 3.5↑ 治療域上限超過、出血リスク高、ワーファリン休薬検討'
    },
    {
      id: 'aptt',
      category: 'coagulation',
      categoryName: '凝固系',
      name: 'APTT',
      fullName: '活性化部分トロンボプラスチン時間',
      unit: '秒',
      normal: '25～40',
      emergency: '> 80',
      high: {
        meaning: 'ヘパリン投与、血友病',
        signs: '出血傾向'
      },
      low: {
        meaning: '血栓傾向',
        signs: 'DIC初期'
      },
      assessment: '内因系凝固能評価。ヘパリン効果モニタリング',
      record: 'APTT 65秒↑ ヘパリン投与中、軽度出血傾向あり、投与量調整'
    },
    {
      id: 'd-dimer',
      category: 'coagulation',
      categoryName: '凝固系',
      name: 'D-dimer',
      fullName: 'Dダイマー',
      unit: 'μg/mL',
      normal: '< 1.0',
      emergency: '> 20',
      high: {
        meaning: 'DIC、血栓症、肺塞栓',
        signs: '呼吸困難、胸痛'
      },
      low: {
        meaning: '血栓リスク低い',
        signs: '-'
      },
      assessment: '血栓症のスクリーニング。陰性で血栓症を除外可能',
      record: 'D-dimer 3.8μg/mL↑ 下肢浮腫・疼痛あり、DVT疑い、造影CT実施予定'
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
    },
    {
      id: 'hba1c',
      category: 'glucose',
      categoryName: '血糖',
      name: 'HbA1c',
      fullName: 'ヘモグロビンA1c',
      unit: '%',
      normal: '4.9～6.0',
      emergency: '> 12.0',
      high: {
        meaning: '糖尿病、血糖コントロール不良',
        signs: '合併症リスク増大'
      },
      low: {
        meaning: '低血糖頻発、貧血',
        signs: '意識障害の既往'
      },
      assessment: '過去1-2ヶ月の平均血糖値。糖尿病治療目標7.0%未満',
      record: 'HbA1c 8.5%↑ 血糖コントロール不良、食事・運動療法の見直し必要'
    }
  ];

  const categories = [
    { id: 'all', name: 'すべて', color: '#6366f1' },
    { id: 'cbc', name: 'CBC(血算)', color: '#ef4444' },
    { id: 'liver', name: '肝機能', color: '#f59e0b' },
    { id: 'renal', name: '腎機能', color: '#10b981' },
    { id: 'electrolyte', name: '電解質', color: '#3b82f6' },
    { id: 'nutrition', name: '栄養・炎症', color: '#8b5cf6' },
    { id: 'coagulation', name: '凝固系', color: '#ec4899' },
    { id: 'glucose', name: '血糖', color: '#14b8a6' }
  ];

  // フィルタリング
  const filteredData = labData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.fullName.includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* ヘッダー */}
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
        {/* 検索バー */}
        <div style={{ 
          position: 'relative', 
          marginBottom: '24px',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <Search 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '16px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }} 
          />
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
              transition: 'all 0.3s',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        {/* カテゴリータブ */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
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
                transition: 'all 0.3s',
                backgroundColor: activeCategory === cat.id ? cat.color : 'white',
                color: activeCategory === cat.id ? 'white' : '#64748b',
                boxShadow: activeCategory === cat.id ? '0 4px 6px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* お気に入り表示 */}
        {favorites.length > 0 && activeCategory === 'all' && !searchTerm && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              color: '#1e293b',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Heart size={20} fill="#ef4444" color="#ef4444" />
              お気に入り
            </h2>
          </div>
        )}

        {/* 検査項目リスト */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredData.map((item, index) => {
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
                  transition: 'all 0.3s',
                  animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
              >
                {/* 項目ヘッダー */}
                <div 
                  onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: category.color,
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {item.categoryName}
                      </span>
                      <h3 style={{ 
                        fontSize: '20px', 
                        fontWeight: '700',
                        color: '#1e293b',
                        margin: 0
                      }}>
                        {item.name}
                      </h3>
                    </div>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#64748b',
                      margin: '4px 0 8px 0'
                    }}>
                      {item.fullName}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      gap: '16px',
                      fontSize: '14px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>
                        基準値: {item.normal} {item.unit}
                      </span>
                      {item.emergency !== '-' && (
                        <span style={{ 
                          color: '#ef4444', 
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <AlertCircle size={16} />
                          緊急: {item.emergency}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Heart 
                        size={22} 
                        fill={isFavorite ? '#ef4444' : 'none'}
                        color={isFavorite ? '#ef4444' : '#94a3b8'}
                      />
                    </button>
                    {isExpanded ? <ChevronUp size={24} color="#64748b" /> : <ChevronDown size={24} color="#64748b" />}
                  </div>
                </div>

                {/* 詳細情報（展開時） */}
                {isExpanded && (
                  <div style={{ 
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '2px solid #f1f5f9',
                    animation: 'expandDown 0.3s ease-out'
                  }}>
                    {/* 高値・低値 */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                      gap: '16px',
                      marginBottom: '20px'
                    }}>
                      {/* 高値 */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#fef2f2',
                        borderRadius: '8px',
                        border: '2px solid #fee2e2'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          marginBottom: '8px'
                        }}>
                          <TrendingUp size={18} color="#ef4444" />
                          <h4 style={{ 
                            fontSize: '16px', 
                            fontWeight: '700',
                            color: '#dc2626',
                            margin: 0
                          }}>
                            高値の場合
                          </h4>
                        </div>
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#7f1d1d',
                          margin: '0 0 8px 0',
                          fontWeight: '600'
                        }}>
                          {item.high.meaning}
                        </p>
                        <p style={{ 
                          fontSize: '13px', 
                          color: '#991b1b',
                          margin: 0
                        }}>
                          症状: {item.high.signs}
                        </p>
                      </div>

                      {/* 低値 */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#eff6ff',
                        borderRadius: '8px',
                        border: '2px solid #dbeafe'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          marginBottom: '8px'
                        }}>
                          <TrendingDown size={18} color="#3b82f6" />
                          <h4 style={{ 
                            fontSize: '16px', 
                            fontWeight: '700',
                            color: '#1d4ed8',
                            margin: 0
                          }}>
                            低値の場合
                          </h4>
                        </div>
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#1e3a8a',
                          margin: '0 0 8px 0',
                          fontWeight: '600'
                        }}>
                          {item.low.meaning}
                        </p>
                        <p style={{ 
                          fontSize: '13px', 
                          color: '#1e40af',
                          margin: 0
                        }}>
                          症状: {item.low.signs}
                        </p>
                      </div>
                    </div>

                    {/* アセスメントポイント */}
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '8px',
                      border: '2px solid #dcfce7',
                      marginBottom: '16px'
                    }}>
                      <h4 style={{ 
                        fontSize: '15px', 
                        fontWeight: '700',
                        color: '#15803d',
                        marginBottom: '8px'
                      }}>
                        📋 アセスメントポイント
                      </h4>
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#166534',
                        margin: 0,
                        lineHeight: '1.6'
                      }}>
                        {item.assessment}
                      </p>
                    </div>

                    {/* 記録例 */}
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#fefce8',
                      borderRadius: '8px',
                      border: '2px solid #fef9c3'
                    }}>
                      <h4 style={{ 
                        fontSize: '15px', 
                        fontWeight: '700',
                        color: '#a16207',
                        marginBottom: '8px'
                      }}>
                        ✏️ 記録例
                      </h4>
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#713f12',
                        margin: 0,
                        lineHeight: '1.6',
                        fontStyle: 'italic'
                      }}>
                        {item.record}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 検索結果なし */}
        {filteredData.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <Search size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
            <p style={{ 
              fontSize: '18px', 
              color: '#64748b',
              fontWeight: '600'
            }}>
              検索結果が見つかりませんでした
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: '#94a3b8',
              marginTop: '8px'
            }}>
              別のキーワードで検索してみてください
            </p>
          </div>
        )}

        {/* フッター */}
        <div style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <p style={{ 
            fontSize: '16px', 
            color: '#1e293b',
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            最新の看護実習情報・国試対策情報をお届け！
          </p>
          <p style={{ 
            fontSize: '14px', 
            color: '#64748b',
            marginBottom: '16px'
          }}>
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
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}>
            📱 公式LINEで最新情報をチェック
          </a>
          <p style={{ 
            fontSize: '12px', 
            color: '#94a3b8',
            marginTop: '12px'
          }}>
            Nurse Path+ by かず学長
          </p>
        </div>
      </div>

      {/* アニメーション用CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes expandDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 2000px; }
        }

        @media (max-width: 768px) {
          div {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default LabDataApp;
                        