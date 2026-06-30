// Action Management — App Shell v2
// PLATFORM chrome (top bar + floating pill nav) is persistent across modules.
// MODULE page (Action Management) lives between the bars: segmented nav + toolbar + FAB.

const OPX = '#1AB3B8'; // OPEX+ turquoise (platform primary)
const OPX_MUTED = '#94A3AC'; // muted grey for inactive nav

// ─── PLATFORM NAV ICONS ───────────────────────────────────────────────────────
const NavHome = ({ active }) =>
<svg width="23" height="23" viewBox="0 0 24 24" fill={active ? OPX : 'none'} stroke={active ? OPX : OPX_MUTED} strokeWidth="1.9" strokeLinejoin="round">
    <path d="M3 10.2L12 3l9 7.2V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" fillOpacity={active ? 0.16 : 0} />
  </svg>;

const NavActions = ({ active }) =>
<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={active ? OPX : OPX_MUTED} strokeWidth="1.9" strokeLinejoin="round">
    <rect x="3" y="3" width="8" height="8" rx="2" fill={active ? OPX : 'none'} fillOpacity={active ? 0.95 : 0} stroke={active ? OPX : OPX_MUTED} />
    <rect x="13" y="3" width="8" height="8" rx="2" fill={active ? OPX : 'none'} fillOpacity={active ? 0.4 : 0} />
    <rect x="3" y="13" width="8" height="8" rx="2" fill={active ? OPX : 'none'} fillOpacity={active ? 0.4 : 0} />
    <rect x="13" y="13" width="8" height="8" rx="2" fill={active ? OPX : 'none'} fillOpacity={active ? 0.16 : 0} />
  </svg>;

const NavApps = ({ active }) =>
<svg width="23" height="23" viewBox="0 0 24 24">
    {[5, 12, 19].map((cy) => [5, 12, 19].map((cx) =>
  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.9" fill={active ? OPX : OPX_MUTED} />
  ))}
  </svg>;


// ─── PLATFORM TOP BAR ─────────────────────────────────────────────────────────
const AmTopBar = ({ unreadNotifs, onOpenSearch, onOpenNotifs, onOpenProfile }) =>
<div style={{
  flexShrink: 0, position: 'relative', zIndex: 8,
  background: 'rgba(247,249,250,0.82)',
  backdropFilter: 'blur(22px) saturate(1.4)', WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
  borderBottom: '1px solid rgba(15,23,42,0.06)'
}}>

    {/* Platform bar: logo · search · bell · avatar */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 14px 12px' }}>
      <button title="OPEX+ home" style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <img src={(typeof window !== 'undefined' && window.__resources && window.__resources.opexLogo) || "assets/opex-o-plus.png"} alt="OPEX+" style={{ height: 28, width: 28, objectFit: 'contain' }} />
      </button>

      <button onClick={onOpenSearch} style={{
      flex: 1, height: 38, borderRadius: 999, border: '1px solid rgba(15,23,42,0.08)',
      background: 'rgba(15,23,42,0.04)', padding: '0 14px',
      display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', minWidth: 0
    }}>
        <AmIcon.Search s={15} c="#9AA7B0" />
        <span style={{ fontSize: 13, color: '#9AA7B0', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>Rechercher</span>
      </button>

      <button onClick={onOpenNotifs} style={{ border: 'none', background: 'none', padding: 4, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
        <AmIcon.Bell s={22} c="#0F172A" dot={unreadNotifs > 0} />
      </button>

      <button onClick={onOpenProfile} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', flexShrink: 0, position: 'relative' }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#3382C4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'Satoshi, sans-serif' }}>JD</div>
        <span style={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%', background: '#22C55E', border: '1.6px solid #F7F9FA' }} />
      </button>
    </div>
  </div>;


// ─── PLATFORM BOTTOM NAV (floating pill) ──────────────────────────────────────
const AmBottomNav = ({ platformNav, onChange }) => {
  const items = [
  { id: 'home', label: 'Accueil', Icon: NavHome },
  { id: 'actions', label: 'Actions', Icon: NavActions },
  { id: 'apps', label: 'Apps', Icon: NavApps }];

  return (
    <div style={{
      position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 18,
      display: 'flex', gap: 4, padding: 5,
      background: 'rgba(255,255,255,0.78)',
      backdropFilter: 'blur(26px) saturate(1.6)', WebkitBackdropFilter: 'blur(26px) saturate(1.6)',
      borderRadius: 999, border: '1px solid rgba(255,255,255,0.7)',
      boxShadow: '0 10px 34px rgba(5,33,63,0.20), 0 2px 8px rgba(5,33,63,0.10)'
    }}>
      {items.map((item) => {
        const active = platformNav === item.id;
        return (
          <button key={item.id} onClick={() => onChange(item.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '8px 22px', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: active ? `${OPX}1A` : 'transparent', transition: 'background 160ms'
          }}>
            <item.Icon active={active} />
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, fontFamily: 'Satoshi, sans-serif', color: active ? OPX : OPX_MUTED, letterSpacing: '0.02em', lineHeight: 1 }}>
              {item.label}
            </span>
          </button>);

      })}
    </div>);

};

// ─── MODULE SEGMENTED NAV (in-page) ───────────────────────────────────────────
const AmModuleTabs = ({ activeTab, onChange, role }) => {
  const tabs = [
  { id: 'kanban', label: 'Kanban' },
  { id: 'list', label: 'List' },
  { id: 'plans', label: 'Plans' },
  ...(role !== 'User' ? [{ id: 'reports', label: 'Reports' }] : [])];

  return (
    <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #EEEEEE', flexShrink: 0, paddingLeft: 4 }}>
      {tabs.map((t) => {
        const active = activeTab === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            padding: '13px 16px 11px', border: 'none', background: 'none', cursor: 'pointer',
            borderBottom: `2.5px solid ${active ? OPX : 'transparent'}`,
            color: active ? OPX : '#64748B', fontSize: 13.5, fontWeight: active ? 700 : 500,
            fontFamily: 'Satoshi, sans-serif', transition: 'color 150ms, border-color 150ms', flexShrink: 0
          }}>
            {t.label}
          </button>);

      })}
    </div>);

};

// ─── MODULE TOOLBAR (KPI tiles + filter chips) ────────────────────────────────
const AmModuleToolbar = ({ allActions, activeKPI, onKPI, groupBy, onGroupBy, showGroupBy, fav, onFav, onOpenFilters, onOpenQR }) => {
  const acts = allActions || [];
  const kpis = [
  { key: 'all', label: 'All', count: acts.length },
  { key: 'mine', label: 'Mine', count: acts.filter((a) => a.assignee === AM_CURRENT_USER.id).length },
  { key: 'open', label: 'Open', count: acts.filter((a) => a.status === 'Open').length },
  { key: 'completed', label: 'Done', count: acts.filter((a) => a.status === 'Completed').length },
  { key: 'overdue', label: 'Overdue', count: acts.filter((a) => a.overdue).length },
  { key: 'draft', label: 'Draft', count: acts.filter((a) => a.status === 'Draft').length }];

  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #EEEEEE', flexShrink: 0 }}>
      {/* KPI tiles */}
      <div style={{ display: 'flex', gap: 7, padding: '11px 14px 0', overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        {kpis.map((k) => {
          const active = activeKPI === k.key;
          return (
            <button key={k.key} onClick={() => onKPI(active ? null : k.key)} style={{
              flexShrink: 0, minWidth: 52, padding: '6px 13px', borderRadius: 11,
              border: `1.5px solid ${active ? OPX : '#ECEFF1'}`,
              background: active ? `${OPX}14` : '#F7F9FA', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, transition: 'all 150ms'
            }}>
              <span style={{ fontSize: 17, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', color: active ? OPX : '#0F172A', lineHeight: 1 }}>{k.count}</span>
              <span style={{ fontSize: 9, fontFamily: 'Satoshi, sans-serif', fontWeight: 600, color: active ? OPX : '#64748B', whiteSpace: 'nowrap', letterSpacing: '0.03em' }}>{k.label}</span>
            </button>);

        })}
      </div>

      {/* Filter row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px 11px' }}>
        <button onClick={onOpenFilters} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0 11px', height: 32, borderRadius: 9, border: '1.5px solid #ECEFF1', background: '#F7F9FA', cursor: 'pointer', flexShrink: 0 }}>
          <AmIcon.Filter s={13} c="#64748B" />
          <span style={{ fontSize: 11.5, fontFamily: 'Satoshi, sans-serif', fontWeight: 600, color: '#64748B' }}>Filters</span>
        </button>

        {/* Saved-filter shortcuts */}
        <div style={{ display: 'flex', gap: 6, flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[{ l: 'FR-Lyon', on: true }, { l: 'Ce mois', on: false }].map((c) =>
          <button key={c.l} style={{
            flexShrink: 0, padding: '0 11px', height: 32, borderRadius: 999,
            border: `1.5px solid ${c.on ? OPX : '#ECEFF1'}`, background: c.on ? `${OPX}12` : '#F7F9FA',
            fontSize: 11, fontFamily: 'Satoshi, sans-serif', fontWeight: 600, color: c.on ? OPX : '#64748B',
            cursor: 'pointer', whiteSpace: 'nowrap'
          }}>{c.l}</button>
          )}
        </div>

        {showGroupBy &&
        <div style={{ display: 'flex', background: '#EEF1F3', borderRadius: 8, padding: 2, flexShrink: 0 }}>
            {['pillar', 'status'].map((g) =>
          <button key={g} onClick={() => onGroupBy(g)} style={{
            padding: '4px 9px', borderRadius: 6, border: 'none', cursor: 'pointer',
            background: groupBy === g ? '#fff' : 'transparent', color: groupBy === g ? '#0F172A' : '#94A3AC',
            fontSize: 9.5, fontWeight: groupBy === g ? 700 : 500, fontFamily: 'Satoshi, sans-serif',
            boxShadow: groupBy === g ? '0 1px 3px rgba(5,33,63,0.1)' : 'none', transition: 'all 150ms', whiteSpace: 'nowrap'
          }}>{g === 'pillar' ? 'Pillar' : 'Status'}</button>
          )}
          </div>
        }

        <button onClick={onOpenQR} style={{ border: 'none', background: 'none', padding: 4, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
          <AmIcon.QR s={18} c="#64748B" />
        </button>
        <button onClick={onFav} style={{ border: 'none', background: 'none', padding: 4, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
          <AmIcon.Heart s={18} filled={fav} c="#64748B" />
        </button>
      </div>
    </div>);

};

// ─── HOME (platform landing placeholder) ──────────────────────────────────────
const AmHomeView = () =>
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F5F5F5', padding: '0 36px', textAlign: 'center' }}>
    <div style={{ width: 74, height: 74, borderRadius: 21, background: `${OPX}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
      <NavHome active />
    </div>
    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>OPEX+ Accueil</div>
    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#64748B', lineHeight: 1.7 }}>Tableau de bord cross-module,<br />favoris et widgets — bientôt disponible.</div>
  </div>;


// ─── APPS (module switcher placeholder) ───────────────────────────────────────
const AmAppsView = () => {
  const apps = [
  { name: 'Actions', color: OPX, letter: 'A', active: true },
  { name: 'TAG+', color: '#6366F1', letter: 'T' },
  { name: 'eCheck', color: '#0891B2', letter: 'C' },
  { name: 'eEvent', color: '#E11D48', letter: 'E' },
  { name: 'SMAT', color: '#D97706', letter: 'S' },
  { name: 'Reports', color: '#7C3AED', letter: 'R' },
  { name: 'EHS', color: '#DC2626', letter: 'H' },
  { name: 'Risk', color: '#EA580C', letter: 'R' }];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#F5F5F5', WebkitOverflowScrolling: 'touch' }}>
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 700, color: '#0F172A' }}>Modules OPEX+</div>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#64748B', marginTop: 3, marginBottom: 18 }}>Accéder à un autre module de la plateforme</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {apps.map((app) =>
          <div key={app.name} style={{ background: '#fff', borderRadius: 14, padding: '15px 14px', boxShadow: '0 2px 8px rgba(5,33,63,0.07)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', border: app.active ? `1.5px solid ${OPX}` : '1.5px solid transparent' }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: `${app.color}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: app.color, fontFamily: 'Satoshi, sans-serif' }}>{app.letter}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', fontFamily: 'Satoshi, sans-serif' }}>{app.name}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: 110 }} />
    </div>);

};

// ─── UNIVERSAL SEARCH OVERLAY (platform-wide) ─────────────────────────────────
const AmSearchOverlay = ({ onClose }) => {
  const [q, setQ] = React.useState('');
  const recents = ['ACT-2026-00142', 'Conveyor belt seal', 'Line 4', 'Jean Dupont'];
  const suggestions = [
  { label: 'Actions · Health & Safety', sub: 'Action management', color: '#4CADAF' },
  { label: 'Actions en retard', sub: 'Action management', color: '#DE1D3F' },
  { label: 'TAG-2156 anomaly', sub: 'TAG+ module', color: '#6366F1' },
  { label: 'Plan AP-2026-001', sub: 'Action management', color: '#3382C4' }];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '14px 14px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#F7F9FA', border: `1.5px solid ${OPX}`, borderRadius: 12, padding: '0 14px', height: 44 }}>
            <AmIcon.Search s={16} c={OPX} />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher dans OPEX+…"
            style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#0F172A', background: 'transparent', minWidth: 0 }} />
            {q && <button onClick={() => setQ('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}><AmIcon.X s={16} c="#AAA" /></button>}
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: OPX, fontFamily: 'Satoshi, sans-serif', flexShrink: 0 }}>Annuler</button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px', WebkitOverflowScrolling: 'touch' }}>
        {!q.trim() ?
        <>
            <AmSectionLabel mb={6}>Recherches récentes</AmSectionLabel>
            {recents.map((r) =>
          <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid #F5F5F5', cursor: 'pointer' }}>
                <AmIcon.Search s={14} c="#CCC" />
                <span style={{ fontSize: 13, color: '#0F172A', fontFamily: 'Poppins, sans-serif' }}>{r}</span>
              </div>
          )}
            <div style={{ marginTop: 22 }}>
              <AmSectionLabel mb={6}>Suggestions transversales</AmSectionLabel>
              {suggestions.map((s) =>
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid #F5F5F5', cursor: 'pointer' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: `${s.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 9, height: 9, borderRadius: 3, background: s.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: '#0F172A', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: '#64748B', fontFamily: 'Poppins, sans-serif' }}>{s.sub}</div>
                  </div>
                  <AmIcon.ChevR s={15} c="#CCC" />
                </div>
            )}
            </div>
          </> :

        <div style={{ textAlign: 'center', padding: '48px 0', color: '#BBB', fontFamily: 'Poppins, sans-serif', fontSize: 13 }}>Recherche de « {q} » dans tous les modules…</div>
        }
        <div style={{ height: 24 }} />
      </div>
    </div>);

};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const AmApp = () => {
  const [platformNav, setPlatformNav] = React.useState('actions'); // home | actions | apps
  const [moduleTab, setModuleTab] = React.useState('kanban'); // kanban | list | plans | reports
  const [activeKPI, setActiveKPI] = React.useState(null);
  const [groupBy, setGroupBy] = React.useState('pillar');
  const [fav, setFav] = React.useState(false);
  const [sheet, setSheet] = React.useState(null);
  const [sheetData, setSheetData] = React.useState(null);
  const [actions, setActions] = React.useState([...AM_ACTIONS_INIT]);
  const [plans] = React.useState([...AM_PLANS_INIT]);

  const role = AM_CURRENT_USER.role; // 'Manager' → Reports visible
  const unreadNotifs = AM_NOTIFS.filter((n) => !n.read).length;

  const openSheet = (type, data = null) => {setSheet(type);setSheetData(data);};
  const closeSheet = () => {setSheet(null);setSheetData(null);};

  const handleViewAction = (action) => openSheet('detail', action);
  const handleCompleteAction = (action) => setActions((prev) => prev.map((a) => a.id === action.id ? { ...a, status: 'Completed', overdue: false } : a));
  const handleCreated = (form) => {
    const newAction = {
      id: `ACT-2026-00${String(Math.floor(Math.random() * 900) + 100)}`, description: form.description,
      pillar: form.pillar || 'safety', status: 'Open', subStatus: 'In Progress',
      priority: form.priority || 'Medium', source: 'Manual', assignee: form.assignee || 'u1',
      due: form.dueDate || '', created: new Date().toISOString().slice(0, 10), overdue: false,
      structure: `${form.dept || '—'} > ${form.workshop || '—'}`, category: form.category || '', planId: form.planId || null,
      sapWo: null, cmms: form.sendToSap || false, comments: [], history: [{ date: new Date().toISOString().slice(0, 10), action: 'Action created' }]
    };
    setActions((prev) => [newAction, ...prev]);
  };

  const fullScreenSheets = ['detail', 'creation', 'plan', 'search', 'profile'];
  const isModule = platformNav === 'actions';
  const showToolbar = isModule && (moduleTab === 'kanban' || moduleTab === 'list');
  const showFAB = isModule && (moduleTab === 'kanban' || moduleTab === 'list') && !sheet;

  // ── Render module view (between the bars) ──
  const renderModule = () => {
    switch (moduleTab) {
      case 'kanban':return <AmKanbanView actions={actions} activeKPI={activeKPI} groupBy={groupBy} onViewAction={handleViewAction} />;
      case 'list':return <AmListView actions={actions} activeKPI={activeKPI} onViewAction={handleViewAction} />;
      case 'plans':return <AmPlansView onOpenPlan={(p) => openSheet('plan', p)} fav={fav} onFav={() => setFav((f) => !f)} />;
      case 'reports':return role !== 'User' ? <AmReportsView /> : null;
      default:return null;
    }
  };

  const renderBody = () => {
    if (platformNav === 'home') return <AmHomeView />;
    if (platformNav === 'apps') return <AmAppsView />;
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <AmModuleTabs activeTab={moduleTab} onChange={setModuleTab} role={role} />
        {showToolbar &&
        <AmModuleToolbar
          allActions={actions} activeKPI={activeKPI} onKPI={setActiveKPI}
          groupBy={groupBy} onGroupBy={setGroupBy} showGroupBy={moduleTab === 'kanban'}
          fav={fav} onFav={() => setFav((f) => !f)}
          onOpenFilters={() => openSheet('filters')} onOpenQR={() => openSheet('qr')} />
        }
        {renderModule()}
      </div>);

  };

  // ── Overlay wrappers ──
  const BottomSheet = ({ children, height = '80%' }) =>
  <>
      <div onClick={closeSheet} style={{ position: 'absolute', inset: 0, background: 'rgba(5,33,63,0.3)', zIndex: 20, backdropFilter: 'blur(1px)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height, background: '#fff', borderRadius: '22px 22px 0 0', zIndex: 21, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 -4px 24px rgba(5,33,63,0.16)', animation: 'slideUp 250ms ease-out' }}>
        {children}
      </div>
    </>;

  const FullSheet = ({ children }) =>
  <div style={{ position: 'absolute', inset: 0, background: '#F5F5F5', zIndex: 22, display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'slideRight 220ms ease-out' }}>
      {children}
    </div>;


  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', fontFamily: 'Satoshi, sans-serif', background: '#F5F5F5' }}>

      {/* PLATFORM TOP BAR (persistent) */}
      <AmTopBar unreadNotifs={unreadNotifs} onOpenSearch={() => openSheet('search')} onOpenNotifs={() => openSheet('notifications')} onOpenProfile={() => openSheet('profile')} />

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {renderBody()}

        {/* MODULE FAB (floats above platform nav) */}
        {showFAB &&
        <button onClick={() => openSheet('creation')} style={{ ...{
            position: 'absolute', bottom: 98, right: 18, width: 56, height: 56, borderRadius: '50%',
            background: OPX, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 6px 20px ${OPX}73`, zIndex: 16, transition: 'transform 150ms'
          }, background: "rgb(51, 130, 196)" }}>
            <AmIcon.Plus s={26} c="#fff" />
          </button>
        }

        {/* PLATFORM BOTTOM NAV (persistent, floating pill) */}
        {!fullScreenSheets.includes(sheet) &&
        <AmBottomNav platformNav={platformNav} onChange={setPlatformNav} />
        }

        {/* ── FULL-SCREEN SHEETS ── */}
        {sheet === 'detail' && <FullSheet><AmActionDetail action={sheetData} onClose={closeSheet} onComplete={handleCompleteAction} /></FullSheet>}
        {sheet === 'creation' && <FullSheet><AmCreationSheet onClose={closeSheet} onCreated={handleCreated} prefillPlanId={sheetData?.planId} /></FullSheet>}
        {sheet === 'plan' && <FullSheet><AmPlanDetail plan={sheetData} onClose={closeSheet} onCreateAction={(planId) => {closeSheet();openSheet('creation', { planId });}} /></FullSheet>}
        {sheet === 'search' && <FullSheet><AmSearchOverlay onClose={closeSheet} /></FullSheet>}
        {sheet === 'profile' && <FullSheet><AmProfileView onClose={closeSheet} /></FullSheet>}

        {/* ── BOTTOM SHEETS ── */}
        {sheet === 'filters' && <BottomSheet height="88%"><AmFiltersSheet onClose={closeSheet} onApply={() => {}} /></BottomSheet>}
        {sheet === 'notifications' && <BottomSheet height="82%"><AmNotificationsDrawer onClose={closeSheet} /></BottomSheet>}
        {sheet === 'qr' && <BottomSheet height="72%"><AmQRScanner onClose={closeSheet} onScan={() => {closeSheet();}} /></BottomSheet>}
      </div>

      <style>{`
        @keyframes slideUp    { from { transform:translateY(100%); } to { transform:translateY(0); } }
        @keyframes slideRight { from { transform:translateX(100%); } to { transform:translateX(0); } }
      `}</style>
    </div>);

};

Object.assign(window, { AmApp });
