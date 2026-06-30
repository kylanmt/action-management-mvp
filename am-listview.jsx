// Action Management MVP — Shared Atoms
// All component names unique to avoid window collision

const AmPriorityTriangle = ({ priority, size = 13 }) => {
  const cfg = AM_PRIORITY_CFG[priority] || { color:'#999' };
  const levels = { 'Critical':4, 'High':3, 'Medium':2, 'Low':1 };
  const level = levels[priority] || 1;
  const blockSize = Math.max(3, Math.round(size * 0.28));
  const gap = Math.max(1, Math.round(size * 0.10));
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap, flexShrink:0 }} title={priority}>
      {[0,1,2,3].map(i => (
        <span key={i} style={{
          width: blockSize, height: blockSize, borderRadius: 1,
          background: i < level ? cfg.color : '#E2E6EA',
        }} />
      ))}
    </span>
  );
};

const AmStatusBadge = ({ status, small }) => {
  const cfg = AM_STATUS_CFG[status] || { color:'#999', bg:'#F5F5F5', label:(status||'').toUpperCase() };
  return (
    <span style={{ fontSize: small ? 9 : 10, fontWeight:600, padding: small ? '2px 6px' : '3px 8px',
      borderRadius:4, background:cfg.bg, color:cfg.color, letterSpacing:'0.04em', whiteSpace:'nowrap',
      fontFamily:'Satoshi, sans-serif', lineHeight:1 }}>
      {cfg.label}
    </span>
  );
};

const AmSourceBadge = ({ source }) => {
  const cfg = AM_SOURCE_CFG[source] || { color:'#666', bg:'#F5F5F5' };
  return (
    <span style={{ fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:999, background:cfg.bg,
      color:cfg.color, letterSpacing:'0.04em', whiteSpace:'nowrap', fontFamily:'Satoshi, sans-serif' }}>
      {source}
    </span>
  );
};

const AmAvatar = ({ userId, size = 26 }) => {
  const user = AM_USERS.find(u => u.id === userId);
  if (!user) return <div style={{ width:size, height:size, borderRadius:'50%', background:'#DDD', flexShrink:0 }} />;
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', background:user.color, display:'flex',
      alignItems:'center', justifyContent:'center', fontSize:Math.round(size*0.36),
      fontWeight:700, color:'#fff', fontFamily:'Satoshi, sans-serif', flexShrink:0, letterSpacing:0 }}>
      {user.initials}
    </div>
  );
};

const AmUserName = ({ userId, firstOnly }) => {
  const user = AM_USERS.find(u => u.id === userId);
  if (!user) return <span>—</span>;
  return <span>{firstOnly ? user.name.split(' ')[0] : user.name}</span>;
};

const AmCategoryDot = ({ pillarId, withName, small }) => {
  const cats = window.AM_CATEGORIES || AM_CATEGORIES || [];
  const p = cats.find(x => x.id === pillarId);
  if (!p) return null;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4,
      fontSize: small ? 9 : 10, color:p.color, fontFamily:'Satoshi, sans-serif', fontWeight:600 }}>
      <span style={{ width: small ? 5 : 7, height: small ? 5 : 7, borderRadius:2, background:p.color, display:'inline-block', flexShrink:0 }} />
      {withName && p.short}
    </span>
  );
};

const AmDueDate = ({ due, overdue, small }) => {
  if (!due) return null;
  const d = new Date(due); const now = new Date();
  const diff = Math.round((d - now) / 86400000);
  const isOd = overdue || diff < 0;
  let label = '';
  if (isOd)            label = `Overdue ${Math.abs(diff)}d`;
  else if (diff === 0) label = 'Due today';
  else if (diff === 1) label = 'Due tomorrow';
  else                 label = d.toLocaleDateString('en-GB', { day:'2-digit', month:'short' });
  return (
    <span style={{ fontSize: small ? 9 : 10, color: isOd ? '#DE1D3F' : '#888',
      fontFamily:'Poppins, sans-serif', display:'inline-flex', alignItems:'center', gap:3 }}>
      {isOd && <svg width="8" height="8" viewBox="0 0 16 16" fill="#DE1D3F"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-4h1.5v4z"/></svg>}
      {label}
    </span>
  );
};

const AmSapBadge = () => (
  <span style={{ fontSize:8, fontWeight:700, padding:'1px 5px', borderRadius:3, background:'#003366', color:'#fff', fontFamily:'Satoshi, sans-serif', letterSpacing:'0.02em' }}>SAP</span>
);

// Icon primitives
const AmIcon = {
  Tag:    ({ s=20, c='#666' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Search: ({ s=20, c='#999' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Bell:   ({ s=20, c='#1B1B1B', dot }) => <span style={{ position:'relative', display:'inline-flex' }}><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>{dot && <span style={{ position:'absolute', top:0, right:0, width:7, height:7, borderRadius:'50%', background:'#DE1D3F', border:'1.5px solid white' }}/>}</span>,
  QR:     ({ s=20, c='#1B1B1B' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h2v2h-2zm4 0h3v2h-3zm-4 4h2v3h-2zm4 0h3v3h-3z"/></svg>,
  Plus:   ({ s=22, c='#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Heart:  ({ s=20, filled, c='#1B1B1B' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={filled?'#DE1D3F':'none'} stroke={filled?'#DE1D3F':c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Filter: ({ s=16, c='#666' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Back:   ({ s=20, c='#1B1B1B' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  More:   ({ s=20, c='#1B1B1B' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1.5" fill={c}/><circle cx="12" cy="12" r="1.5" fill={c}/><circle cx="12" cy="19" r="1.5" fill={c}/></svg>,
  Check:  ({ s=16, c='#4CADAF' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X:      ({ s=18, c='#888' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ChevR:  ({ s=16, c='#CCC' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  ChevD:  ({ s=14, c='#999' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Reset:  ({ s=14, c='#64748B' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  Edit:   ({ s=14, c='#555' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  List:   ({ s=20, c='#666' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Grid:   ({ s=20, c='#666' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  Send:   ({ s=16, c='#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Attach: ({ s=16, c='#666' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>,
  Export: ({ s=16, c='#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Chart:  ({ s=20, c='#666' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  User:   ({ s=20, c='#666' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Home:   ({ s=20, c='#666' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Folder: ({ s=20, c='#666' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  Sparkle:({ s=16, c='#3382C4' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Camera: ({ s=20, c='#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Link:   ({ s=14, c='#3382C4' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
};

// Button components
const AmBtnPrimary = ({ children, onClick, disabled, full, sm, danger, outline }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: full ? '100%' : 'auto',
    height: sm ? 34 : 44, padding: sm ? '0 14px' : '0 18px',
    borderRadius:10, border: outline ? `1.5px solid ${danger?'#DE1D3F':'#3382C4'}` : 'none',
    cursor: disabled ? 'default' : 'pointer',
    background: disabled ? '#E5E5E5' : outline ? 'transparent' : danger ? '#DE1D3F' : '#3382C4',
    color: disabled ? '#999' : outline ? (danger?'#DE1D3F':'#3382C4') : '#fff',
    fontSize: sm ? 12 : 14, fontWeight:600, fontFamily:'Satoshi, sans-serif',
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
    transition:'background 150ms', flexShrink:0,
  }}>{children}</button>
);

const AmBtnGhost = ({ children, onClick, full, sm, active }) => (
  <button onClick={onClick} style={{
    width: full ? '100%' : 'auto',
    height: sm ? 34 : 44, padding: sm ? '0 12px' : '0 16px',
    borderRadius:10, border:'1.5px solid', borderColor: active ? '#3382C4' : '#DDDDDD',
    background: active ? '#EAF2FA' : '#fff',
    color: active ? '#3382C4' : '#555',
    fontSize: sm ? 12 : 14, fontWeight:500, fontFamily:'Satoshi, sans-serif',
    display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
    cursor:'pointer', transition:'all 150ms', flexShrink:0,
  }}>{children}</button>
);

const AmDivider = ({ my = 0, mx = 0 }) => <div style={{ height:1, background:'#EEEEEE', margin:`${my}px ${mx}px` }} />;
const AmSectionLabel = ({ children, mb = 8 }) => (
  <div style={{ fontSize:10, fontWeight:700, color:'#999', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'Satoshi, sans-serif', marginBottom:mb }}>{children}</div>
);
const AmProgressBar = ({ value, color='#3382C4', h=4 }) => (
  <div style={{ height:h, background:'#EEEEEE', borderRadius:999, overflow:'hidden' }}>
    <div style={{ height:'100%', width:`${Math.min(100,Math.max(0,value))}%`, background:color, borderRadius:999, transition:'width 400ms ease' }} />
  </div>
);

Object.assign(window, {
  AmPriorityTriangle, AmStatusBadge, AmSourceBadge, AmAvatar, AmUserName,
  AmCategoryDot, AmDueDate, AmSapBadge, AmIcon, AmBtnPrimary, AmBtnGhost,
  AmDivider, AmSectionLabel, AmProgressBar,
});
