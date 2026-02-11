import { createClient } from '@supabase/supabase-js'

export default async function RaadDashboard() {
  // الاتصال بقاعدة البيانات باستخدام المفاتيح التي وضعتها في Vercel
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // جلب البيانات من جدول الخردة
  const { data: scrap } = await supabase.from('scrap_inventory').select('*')

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', direction: 'rtl' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '3px solid #2ecc71', paddingBottom: '20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '2.5rem' }}>منصة راد | RAAD Platform</h1>
        <p style={{ color: '#4a5568', fontSize: '1.2rem' }}>النظام العالمي لتتبع الخردة وأثر الكربون 🌍</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {scrap?.length ? scrap.map((item) => (
          <div key={item.id} style={{ background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', borderRight: '10px solid #2ecc71' }}>
            <h2 style={{ color: '#2d3748', marginTop: '0' }}>📦 المادة: {item.material_type === 'Copper' ? 'نحاس' : item.material_type}</h2>
            <p style={{ fontSize: '1.1rem' }}><strong>الوزن الإجمالي:</strong> {item.weight_kg} كجم</p>
            <p style={{ fontSize: '1.1rem' }}><strong>موقع التخزين:</strong> {item.location}</p>
            <div style={{ background: '#f0fff4', padding: '15px', borderRadius: '10px', marginTop: '15px', border: '1px dashed #276749' }}>
              <span style={{ color: '#276749', fontWeight: 'bold', fontSize: '1.1rem' }}>🌱 توفير الانبعاثات: {item.carbon_offset} كجم من CO2</span>
            </div>
          </div>
        )) : (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>جاري سحب البيانات من الخزنة...</p>
        )}
      </div>
      
      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#718096' }}>
        <p>© 2026 منصة راد - مشروع الاقتصاد الدائري العالمي</p>
      </footer>
    </div>
  )
}
