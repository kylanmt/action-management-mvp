// Action Management — Kanban View

const AmActionCard = ({ action, onView, onComplete, groupBy, isAdmin, onReassign, onChangeStatus, onDelete }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [menu, setMenu] = React.useState(null); // null | 'root' | 'reassign' | 'status'
  const isOverdue = action.overdue;
  const STATUSES = ['Open', 'In Progress', 'On Hold', 'Completed', 'Cancelled'];

  const closeMenu = (e) => { if (e) e.stopPropagation(); setMenu(null); };

  return (
    <div style={{ position:'relative', marginBottom:10 }}>
    <div style={{
      background:'#fff', borderRadius:12, boxShadow:'0 2px 8px rgba(5,33,63,0.07)',
      overflow:'hidden',
      borderLeft: isOverdue ? '3px solid #DE1D3F' : '3px solid transparent',
      transition:'box-shadow 150ms',
    }}>
      <div style={{ padding:'12px 14px', cursor:'pointer' }} onClick={() => setExpanded(e => !e)}>
        {/* Row 1: source + CMMS + priority */}
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
          <AmSourceBadge source={action.source} />
          {action.cmms && <AmSapBadge />}
          {action.status === 'Draft' && (
            <span style={{ fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:4, background:'#F0F0F0', color:'#888', fontFamily:'Satoshi, sans-serif', letterSpacing:'0.04em' }}>DRAFT</span>
          )}
          <div style={{ flex:1 }} />
          <AmPriorityTriangle priority={action.priority} size={13} />
          {isAdmin && (
            <button onClick={(e) => { e.stopPropagation(); setMenu(m => m ? null : 'root'); }}
              style={{ border:'none', background: menu ? '#EEF1F3' : 'none', borderRadius:6, padding:'2px 3px', marginRight:-3, marginLeft:1, cursor:'pointer', display:'flex', alignItems:'center' }}>
              <AmIcon.More s={17} c="#94A3AC" />
            </button>
          )}
        </div>
        {/* ID */}
        <div style={{ fontSize:10, color:'#999', fontFamily:'Poppins, sans-serif', fontWeight:500, marginBottom:4, letterSpacing:'0.01em' }}>
          {action.id}
        </div>
        {/* Description */}
        <div style={{ fontSize:13, color:'#1B1B1B', fontFamily:'Poppins, sans-serif', lineHeight:1.45, marginBottom:10,
          display:'-webkit-box', WebkitLineClamp: expanded ? 'none' : 2, WebkitBoxOrient:'vertical', overflow: expanded ? 'visible' : 'hidden' }}>
          {action.description}
        </div>
        {/* Status when grouping by pillar */}
        {groupBy === 'category' && (
          <div style={{ marginBottom:7 }}>
            <AmStatusBadge status={action.status} small />
          </div>
        )}
        {/* Row: assignee + due */}
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <AmAvatar userId={action.assignee} size={22} />
          <span style={{ fontSize:11, color:'#666', fontFamily:'Poppins, sans-serif', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            <AmUserName userId={action.assignee} firstOnly />
          </span>
          <AmDueDate due={action.due} overdue={action.overdue} small />
          {/* Expand indicator */}
          <span style={{ transition:'transform 200ms', display:'inline-block', transform: expanded ? 'rotate(180deg)' : 'none' }}>
            <AmIcon.ChevD s={13} c="#CCC" />
          </span>
        </div>
      </div>

      {/* Expanded actions */}
      {expanded && (
        <div style={{ borderTop:'1px solid #F0F0F0', padding:'10px 14px', background:'#FAFAFA', display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
          <AmCategoryDot pillarId={action.pillar} withName small />
          {action.planId && (
            <span style={{ fontSize:10, color:'#3382C4', fontFamily:'Poppins, sans-serif' }}>· Plan {action.planId}</span>
          )}
          <div style={{ flex:1 }} />
          {action.status !== 'Completed' && action.status !== 'Cancelled' && action.source !== 'EHS' && (
            <AmBtnPrimary sm onClick={e => { e.stopPropagation(); onComplete(action); }}>
              <AmIcon.Check s={12} c="#fff" /> Complete
            </AmBtnPrimary>
          )}
          <AmBtnGhost sm onClick={e => { e.stopPropagation(); onView(action); }}>View</AmBtnGhost>
        </div>
      )}
    </div>

      {/* Admin action menu */}
      {isAdmin && menu && (
        <React.Fragment>
          {/* click-away */}
          <div onClick={closeMenu} style={{ position:'fixed', inset:0, zIndex:30 }} />
          <div style={{
            position:'absolute', top:34, right:8, zIndex:31, width:198,
            background:'#fff', borderRadius:10, border:'1px solid #ECEFF1',
            boxShadow:'0 8px 24px rgba(5,33,63,0.16)', overflow:'hidden',
            fontFamily:'Satoshi, sans-serif'
          }} onClick={e => e.stopPropagation()}>
            {menu === 'root' && (
              <React.Fragment>
                <AmMenuItem icon={<AmIcon.User s={15} c="#3382C4" />} label="Reassign" onClick={() => setMenu('reassign')} chevron />
                <AmMenuItem icon={<AmIcon.Filter s={14} c="#3382C4" />} label="Change status" onClick={() => setMenu('status')} chevron />
                <div style={{ height:1, background:'#F0F0F0' }} />
                <AmMenuItem icon={<AmIcon.X s={15} c="#DE1D3F" />} label="Delete" danger
                  onClick={() => { onDelete && onDelete(action); setMenu(null); }} />
              </React.Fragment>
            )}
            {menu === 'reassign' && (
              <React.Fragment>
                <AmMenuHeader label="Reassign to" onBack={() => setMenu('root')} />
                <div style={{ maxHeight:194, overflowY:'auto' }}>
                  {AM_USERS.map(u => (
                    <button key={u.id} onClick={() => { onReassign && onReassign(action, u.id); setMenu(null); }}
                      style={{ width:'100%', display:'flex', alignItems:'center', gap:9, padding:'9px 12px', border:'none', background: u.id === action.assignee ? '#F2F7FB' : '#fff', cursor:'pointer', textAlign:'left' }}>
                      <AmAvatar userId={u.id} size={22} />
                      <span style={{ fontSize:12.5, color:'#1B1B1B', fontFamily:'Poppins, sans-serif', flex:1 }}>{u.name}</span>
                      {u.id === action.assignee && <AmIcon.Check s={14} c="#3382C4" />}
                    </button>
                  ))}
                </div>
              </React.Fragment>
            )}
            {menu === 'status' && (
              <React.Fragment>
                <AmMenuHeader label="Change status" onBack={() => setMenu('root')} />
                {STATUSES.map(s => (
                  <button key={s} onClick={() => { onChangeStatus && onChangeStatus(action, s); setMenu(null); }}
                    style={{ width:'100%', display:'flex', alignItems:'center', gap:9, padding:'9px 12px', border:'none', background: s === action.status ? '#F2F7FB' : '#fff', cursor:'pointer', textAlign:'left' }}>
                    <span style={{ width:9, height:9, borderRadius:3, background: AM_STATUS_CFG[s]?.color || '#999', flexShrink:0 }} />
                    <span style={{ fontSize:12.5, color:'#1B1B1B', fontFamily:'Poppins, sans-serif', flex:1 }}>{s}</span>
                    {s === action.status && <AmIcon.Check s={14} c="#3382C4" />}
                  </button>
                ))}
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

// Alert card — minimal, action-less notification surfaced in a column.
// Tapping it will later redirect to the source record (no in-app detail view for now).
const AmAlertCard = ({ alert, onOpen }) => (
  <div onClick={() => onOpen && onOpen(alert)} style={{
    display:'flex', alignItems:'center', gap:11, padding:'11px 13px', marginBottom:10,
    background:'#fff', borderRadius:12, boxShadow:'0 2px 8px rgba(5,33,63,0.07)', cursor:'pointer',
    transition:'box-shadow 150ms',
  }}>
    <div style={{ width:34, height:34, borderRadius:9, background:'#EAF2FA', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <AmIcon.Bell s={17} c="#3382C4" />
    </div>
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ fontSize:9, fontWeight:700, color:'#3382C4', fontFamily:'Satoshi, sans-serif', letterSpacing:'0.06em', marginBottom:2 }}>ALERT · {alert.source}</div>
      <div style={{ fontSize:13, color:'#1B1B1B', fontFamily:'Poppins, sans-serif', fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{alert.label}</div>
      {(alert.due || alert.structure) && (
        <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
          {alert.due && <AmDueDate due={alert.due} small />}
          {alert.due && alert.structure && <span style={{ width:3, height:3, borderRadius:'50%', background:'#CBD5DD', flexShrink:0 }} />}
          {alert.structure && (
            <span style={{ fontSize:10, color:'#888', fontFamily:'Poppins, sans-serif', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', minWidth:0 }}>{alert.structure}</span>
          )}
        </div>
      )}
    </div>
    <AmIcon.ChevR s={16} c="#CBD5DD" />
  </div>
);

const AmMenuItem = ({ icon, label, onClick, chevron, danger }) => (
  <button onClick={onClick} style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'11px 12px', border:'none', background:'#fff', cursor:'pointer', textAlign:'left' }}>
    <span style={{ display:'flex', width:16, justifyContent:'center' }}>{icon}</span>
    <span style={{ fontSize:13, color: danger ? '#DE1D3F' : '#1B1B1B', fontFamily:'Poppins, sans-serif', flex:1 }}>{label}</span>
    {chevron && <AmIcon.ChevR s={14} c="#CCC" />}
  </button>
);

const AmMenuHeader = ({ label, onBack }) => (
  <div style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 10px', borderBottom:'1px solid #F0F0F0', background:'#FAFBFC' }}>
    <button onClick={onBack} style={{ border:'none', background:'none', padding:2, cursor:'pointer', display:'flex' }}>
      <AmIcon.Back s={15} c="#64748B" />
    </button>
    <span style={{ fontSize:11, fontWeight:700, color:'#64748B', fontFamily:'Satoshi, sans-serif', textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</span>
  </div>
);

// View receives KPI + groupBy state from the platform shell (lifted to the module toolbar).
const AmKanbanView = ({ onViewAction, actions, activeKPI, groupBy, isAdmin, onReassign, onChangeStatus, onDelete, categories }) => {
  const [colIndex, setColIndex] = React.useState(0);
  const touchStart = React.useRef(null);

  const allActions = actions || AM_ACTIONS_INIT;

  // KPI filter logic
  const kpiFilter = (acts) => {
    if (!activeKPI || activeKPI === 'all') return acts;
    if (activeKPI === 'mine')      return acts.filter(a => a.assignee === AM_CURRENT_USER.id);
    if (activeKPI === 'open')      return acts.filter(a => a.status === 'Open');
    if (activeKPI === 'completed') return acts.filter(a => a.status === 'Completed');
    if (activeKPI === 'overdue')   return acts.filter(a => a.overdue);
    if (activeKPI === 'draft')     return acts.filter(a => a.status === 'Draft');
    return acts;
  };

  const filteredActions = kpiFilter(allActions);

  // Alerts surface alongside actions; hidden when a specific KPI filter is active.
  const alertsAll = (typeof AM_ALERTS !== 'undefined' && AM_ALERTS) || [];
  const showAlerts = !activeKPI || activeKPI === 'all';

  // Reset column index when grouping or filter changes
  React.useEffect(() => { setColIndex(0); }, [groupBy, activeKPI]);

  // Build columns
  const getColumns = () => {
    if (groupBy === 'category') {
      const cats = categories || window.AM_CATEGORIES || AM_CATEGORIES || [];
      return cats.map(p => ({
        id:p.id, label:p.name, color:p.color,
        alerts: showAlerts ? alertsAll.filter(al => al.pillar === p.id) : [],
        actions: filteredActions.filter(a => a.pillar === p.id)
      })).filter(c => c.actions.length + c.alerts.length > 0);
    } else {
      return ['Open','In Progress','On Hold','Completed','Cancelled','Draft'].map(s => ({
        id:s, label:s, color: AM_STATUS_CFG[s]?.color || '#999',
        alerts: showAlerts ? alertsAll.filter(al => al.status === s) : [],
        actions: filteredActions.filter(a => a.status === s)
      })).filter(c => c.actions.length + c.alerts.length > 0);
    }
  };

  const columns = getColumns();
  const safeIdx = Math.min(colIndex, Math.max(0, columns.length - 1));
  const col = columns[safeIdx];

  const handleTouchStart = e => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = e => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && safeIdx < columns.length - 1) setColIndex(safeIdx + 1);
      if (diff < 0 && safeIdx > 0) setColIndex(safeIdx - 1);
    }
    touchStart.current = null;
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'#F5F5F5' }}>
      {/* ── COLUMN AREA ── */}
      <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', paddingTop:14 }}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* Column header */}
        {col && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px 10px', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:9, height:9, borderRadius:3, background:col.color, flexShrink:0 }} />
              <span style={{ fontFamily:'Montserrat, sans-serif', fontSize:14, fontWeight:700, color:'#1B1B1B' }}>{col.label}</span>
              <span style={{ fontFamily:'Satoshi, sans-serif', fontSize:10, fontWeight:700, color:'#fff', background:col.color, padding:'2px 7px', borderRadius:999 }}>{col.actions.length + col.alerts.length}</span>
            </div>
            {/* Column nav arrows */}
            <div style={{ display:'flex', gap:6, alignItems:'center' }}>
              {/* Dots indicator */}
              <div style={{ display:'flex', gap:4, alignItems:'center', marginRight:4 }}>
                {columns.slice(0, 8).map((_, i) => (
                  <div key={i} style={{ width: i === safeIdx ? 14 : 5, height:5, borderRadius:999, background: i === safeIdx ? '#3382C4' : '#CCC', transition:'all 200ms', cursor:'pointer' }} onClick={() => setColIndex(i)} />
                ))}
              </div>
              <button onClick={() => setColIndex(Math.max(0, safeIdx-1))} disabled={safeIdx === 0}
                style={{ border:'none', background: safeIdx === 0 ? '#F5F5F5' : '#fff', borderRadius:8, width:30, height:30, cursor: safeIdx === 0 ? 'default' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 1px 3px rgba(5,33,63,0.08)', opacity: safeIdx === 0 ? 0.4 : 1 }}>
                <AmIcon.Back s={14} c="#555" />
              </button>
              <button onClick={() => setColIndex(Math.min(columns.length-1, safeIdx+1))} disabled={safeIdx >= columns.length-1}
                style={{ border:'none', background: safeIdx >= columns.length-1 ? '#F5F5F5' : '#fff', borderRadius:8, width:30, height:30, cursor: safeIdx >= columns.length-1 ? 'default' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 1px 3px rgba(5,33,63,0.08)', opacity: safeIdx >= columns.length-1 ? 0.4 : 1 }}>
                <AmIcon.ChevR s={14} c="#555" />
              </button>
            </div>
          </div>
        )}

        {/* Cards */}
        <div style={{ flex:1, overflowY:'auto', padding:'0 16px 104px', WebkitOverflowScrolling:'touch' }}>
          {col && col.actions.length === 0 && col.alerts.length === 0 && (
            <div style={{ textAlign:'center', padding:'48px 0', color:'#CCC' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>—</div>
              <div style={{ fontFamily:'Poppins, sans-serif', fontSize:13, color:'#CCC' }}>No actions here</div>
            </div>
          )}
          {col && col.alerts.map(alert => (
            <AmAlertCard key={alert.id} alert={alert} />
          ))}
          {col && col.actions.map(action => (
            <AmActionCard key={action.id} action={action} groupBy={groupBy} onView={onViewAction} onComplete={onViewAction}
              isAdmin={isAdmin} onReassign={onReassign} onChangeStatus={onChangeStatus} onDelete={onDelete} />
          ))}
          {!col && (
            <div style={{ textAlign:'center', padding:'48px 0' }}>
              <div style={{ fontFamily:'Poppins, sans-serif', fontSize:13, color:'#CCC' }}>No actions match current filters</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AmActionCard, AmAlertCard, AmKanbanView });
