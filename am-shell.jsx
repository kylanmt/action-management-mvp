// Action Management — Action Detail View

// Linked record panel — surfaces the description of the source record an action
// was created from (a tag, event, SMAT observation, audit finding…), so the
// reader can get the original context when the action's own wording is thin.
const AmLinkedRecord = ({ record }) => {
  const [open, setOpen] = React.useState(false);
  if (!record) return null;
  const cfg = AM_SOURCE_CFG[record.type] || { color:'#666', bg:'#F5F5F5' };
  const dateLabel = record.date
    ? new Date(record.date).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })
    : null;
  return (
    <div style={{ marginTop:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
        <AmIcon.Link s={11} c="#AAA" />
        <span style={{ fontSize:9, fontWeight:700, color:'#AAA', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'Satoshi, sans-serif' }}>
          Linked record
        </span>
      </div>
      <div style={{ background:'#F7F9FB', border:'1px solid #E8EEF4', borderRadius:10, overflow:'hidden' }}>
        {/* Header — tappable to open the source record */}
        <button onClick={() => {}}
          style={{ width:'100%', border:'none', background:'none', cursor:'pointer', textAlign:'left', padding:'11px 12px 0', display:'block' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7, minWidth:0 }}>
              <AmSourceBadge source={record.type} />
              <span style={{ fontSize:11, fontWeight:600, color:'#555', fontFamily:'Poppins, sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                {record.id}
              </span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
              <AmStatusBadge status={record.status} small />
              <AmIcon.ChevR s={15} c="#BBB" />
            </div>
          </div>
          <div style={{ fontSize:13, fontWeight:600, color:'#1B1B1B', fontFamily:'Poppins, sans-serif', marginTop:8, lineHeight:1.35 }}>
            {record.title}
          </div>
        </button>
        {/* Description from the record */}
        <div style={{ padding:'6px 12px 0' }}>
          <div style={{
            fontSize:12, color:'#555', fontFamily:'Poppins, sans-serif', lineHeight:1.55,
            display:'-webkit-box', WebkitBoxOrient:'vertical', WebkitLineClamp: open ? 'unset' : 2, overflow:'hidden',
          }}>
            {record.description}
          </div>
          <button onClick={() => setOpen(o => !o)}
            style={{ border:'none', background:'none', cursor:'pointer', padding:'4px 0 0', fontSize:11, fontWeight:600,
              color:'#3382C4', fontFamily:'Satoshi, sans-serif' }}>
            {open ? 'Show less' : 'Show more'}
          </button>
        </div>
        {/* Footer meta */}
        <div style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 12px 11px', marginTop:4, borderTop:'1px solid #EDF1F6' }}>
          {record.reporter && <AmAvatar userId={record.reporter} size={16} />}
          <span style={{ fontSize:10, color:'#999', fontFamily:'Poppins, sans-serif' }}>
            {record.reporter && <>Reported by <AmUserName userId={record.reporter} firstOnly /></>}
            {record.reporter && dateLabel && ' · '}
            {dateLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

const AM_MENTION_GROUPS = [
  { id:'g1', name:'EHS Team',    initials:'EHS', color:'#4CADAF', isGroup:true },
  { id:'g2', name:'Maintenance', initials:'MNT', color:'#0976B8', isGroup:true },
  { id:'g3', name:'All',         initials:'ALL', color:'#999999', isGroup:true },
];

const renderMentions = (text) =>
  text.split(/(@[\w][\w ]*)/g).map((part, i) =>
    /^@/.test(part)
      ? <span key={i} style={{ color:'#3382C4', fontWeight:600, fontFamily:'Satoshi, sans-serif' }}>{part}</span>
      : part
  );

const AmActionDetail = ({ action, onClose, onComplete, onEdit }) => {
  const [moreOpen, setMoreOpen]       = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [comments, setComments]       = React.useState(action ? action.comments || [] : []);
  const [completed, setCompleted]     = React.useState(action?.status === 'Completed');
  const [showMenu, setShowMenu]       = React.useState(false);
  const [mentionQuery, setMentionQuery] = React.useState(null);
  const commentInputRef = React.useRef();

  const mentionSources = [...(window.AM_USERS || AM_USERS), ...AM_MENTION_GROUPS];
  const filteredMentions = mentionQuery !== null
    ? mentionSources.filter(u => u.name.toLowerCase().startsWith(mentionQuery.toLowerCase())).slice(0, 6)
    : [];

  const handleCommentChange = (e) => {
    const val = e.target.value;
    setCommentText(val);
    const cursor = e.target.selectionStart;
    const before = val.slice(0, cursor);
    const m = before.match(/@([\w ]*)$/);
    setMentionQuery(m ? m[1] : null);
  };

  const insertMention = (name) => {
    const el = commentInputRef.current;
    if (!el) return;
    const cursor = el.selectionStart;
    const before = commentText.slice(0, cursor);
    const m = before.match(/@([\w ]*)$/);
    if (!m) return;
    const start = cursor - m[0].length;
    const newText = commentText.slice(0, start) + '@' + name + '\u00a0' + commentText.slice(cursor);
    setCommentText(newText);
    setMentionQuery(null);
    setTimeout(() => { el.focus(); el.setSelectionRange(start + name.length + 2, start + name.length + 2); }, 0);
  };

  if (!action) return null;
  const pillar = (window.AM_CATEGORIES || AM_CATEGORIES || []).find(p => p.id === action.pillar);
  const statusCfg = AM_STATUS_CFG[action.status] || {};
  const isOverdue = action.overdue;

  const handleComplete = () => {
    setCompleted(true);
    onComplete && onComplete(action);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    setComments(c => [...c, { user: AM_CURRENT_USER.id, date: new Date().toISOString().slice(0,10), text: commentText.trim() }]);
    setCommentText('');
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'#F5F5F5' }}>
      {/* Sticky header */}
      <div style={{ background:'#fff', padding:'14px 16px 12px', borderBottom:'1px solid #EEEEEE', flexShrink:0, position:'relative' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:2 }}>
          <button onClick={onClose} style={{ border:'none', background:'none', cursor:'pointer', padding:4, display:'flex', marginLeft:-4 }}>
            <AmIcon.Back s={22} c="#1B1B1B" />
          </button>
          <span style={{ fontSize:11, fontFamily:'Poppins, sans-serif', fontWeight:600, color:'#888', letterSpacing:'0.02em' }}>
            {action.id}
          </span>
          <div style={{ width:30 }} />
        </div>
        {/* Action menu dropdown */}
        {showMenu && (
          <div style={{ position:'absolute', top:50, right:16, background:'#fff', borderRadius:12, boxShadow:'0 8px 24px rgba(5,33,63,0.14)', zIndex:10, overflow:'hidden', minWidth:180 }}>
            {[
              { label:'Reassign action', icon:'👤' },
              { label:'Export as PDF',   icon:'📄' },
              { label:'Cancel action',   icon:'🚫', danger:true },
            ].map(item => (
              <button key={item.label} onClick={() => setShowMenu(false)}
                style={{ width:'100%', padding:'13px 16px', border:'none', background:'none', cursor:'pointer', textAlign:'left',
                  fontSize:13, fontFamily:'Poppins, sans-serif', fontWeight:500, color: item.danger ? '#DE1D3F' : '#1B1B1B',
                  display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #EEEEEE' }}>
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Scrollable body */}
      <div style={{ flex:1, overflowY:'auto', WebkitOverflowScrolling:'touch' }}>
        {/* Primary info block */}
        <div style={{ background:'#fff', padding:'16px 16px 18px', marginBottom:8, borderLeft: isOverdue ? '4px solid #DE1D3F' : 'none' }}>
          {/* Source + status row */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12, flexWrap:'wrap' }}>
            <AmSourceBadge source={action.source} />
            <AmStatusBadge status={completed ? 'Completed' : action.status} />
            {action.cmms && <AmSapBadge />}
            {action.status === 'Draft' && <span style={{ fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:4, background:'#F0F0F0', color:'#888', fontFamily:'Satoshi, sans-serif', letterSpacing:'0.04em' }}>DRAFT</span>}
          </div>
          {/* Description */}
          <div style={{ fontFamily:'Poppins, sans-serif', fontSize:14, color:'#1B1B1B', lineHeight:1.55, marginBottom:16, fontWeight:500 }}>
            {action.description}
          </div>
          {/* Meta grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 16px' }}>
            {[
              { label:'Category', value: <AmCategoryDot pillarId={action.pillar} withName /> },
              { label:'Priority', value: <span style={{ display:'flex', alignItems:'center', gap:5 }}><AmPriorityTriangle priority={action.priority} size={12} /><span style={{ fontSize:12, color: AM_PRIORITY_CFG[action.priority]?.color, fontFamily:'Satoshi, sans-serif', fontWeight:600 }}>{action.priority}</span></span> },
              { label:'Assignee', value: <span style={{ display:'flex', alignItems:'center', gap:6 }}><AmAvatar userId={action.assignee} size={20} /><span style={{ fontSize:12, fontFamily:'Poppins, sans-serif', color:'#1B1B1B' }}><AmUserName userId={action.assignee} firstOnly /></span></span> },
              { label:'Due date', value: <AmDueDate due={action.due} overdue={action.overdue} /> },
              { label:'Structure', value: <span style={{ fontSize:11, color:'#555', fontFamily:'Poppins, sans-serif' }}>{action.structure}</span>, full:true },
            ].map((item, i) => (
              <div key={i} style={{ gridColumn: item.full ? '1 / -1' : 'auto' }}>
                <div style={{ fontSize:9, fontWeight:700, color:'#AAA', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'Satoshi, sans-serif', marginBottom:3 }}>{item.label}</div>
                <div style={{ fontSize:12, color:'#1B1B1B', fontFamily:'Poppins, sans-serif' }}>{item.value}</div>
              </div>
            ))}
          </div>


        </div>

        {/* Collapsible more info */}
        <div style={{ background:'#fff', marginBottom:8 }}>
          <button onClick={() => setMoreOpen(m => !m)}
            style={{ width:'100%', padding:'13px 16px', border:'none', background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:'Satoshi, sans-serif', fontSize:12, fontWeight:700, color:'#555' }}>More information</span>
            <span style={{ transition:'transform 200ms', display:'inline-block', transform: moreOpen ? 'rotate(180deg)' : 'none' }}>
              <AmIcon.ChevD s={16} c="#AAA" />
            </span>
          </button>
          {moreOpen && (
            <div style={{ padding:'0 16px 16px' }}>
              <AmDivider mb={12} />
              {action.linkedRecord && (
                <div style={{ marginBottom:12 }}>
                  <AmLinkedRecord record={action.linkedRecord} />
                </div>
              )}
              {[
                { label:'Created by', value:<span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><AmAvatar userId="u1" size={16} /><span><AmUserName userId="u1" /></span></span> },
                { label:'Created on', value: action.created },
                { label:'Action plan',value: action.planId   || '—' },
                { label:'SAP WO',     value: action.sapWo    || '—' },
                { label:'Watchlist',  value: '—' },
              ].map(item => (
                <div key={item.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid #F5F5F5' }}>
                  <span style={{ fontSize:11, color:'#888', fontFamily:'Poppins, sans-serif' }}>{item.label}</span>
                  <span style={{ fontSize:11, color:'#1B1B1B', fontFamily:'Poppins, sans-serif', fontWeight:500, textAlign:'right', maxWidth:'60%' }}>{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* History */}
        <div style={{ background:'#fff', marginBottom:8 }}>
          <button onClick={() => setHistoryOpen(h => !h)}
            style={{ width:'100%', padding:'13px 16px', border:'none', background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:'Satoshi, sans-serif', fontSize:12, fontWeight:700, color:'#555' }}>History</span>
            <span style={{ transition:'transform 200ms', display:'inline-block', transform: historyOpen ? 'rotate(180deg)' : 'none' }}>
              <AmIcon.ChevD s={16} c="#AAA" />
            </span>
          </button>
          {historyOpen && <div style={{ padding:'0 16px 16px', paddingLeft:24 }}>
            {action.history && action.history.map((h, i) => (
              <div key={i} style={{ display:'flex', gap:10, paddingBottom:12, position:'relative' }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#3382C4', marginTop:3 }} />
                  {i < action.history.length-1 && <div style={{ width:1, flex:1, background:'#E8E8E8', marginTop:3 }} />}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, color:'#1B1B1B', fontFamily:'Poppins, sans-serif', lineHeight:1.4 }}>{h.action}</div>
                  <div style={{ fontSize:10, color:'#AAA', fontFamily:'Poppins, sans-serif', marginTop:2 }}>{h.date}</div>
                </div>
              </div>
            ))}
            {completed && (
              <div style={{ display:'flex', gap:10 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'#4CADAF', marginTop:3, flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:12, color:'#4CADAF', fontFamily:'Poppins, sans-serif', fontWeight:600 }}>Marked as Completed</div>
                  <div style={{ fontSize:10, color:'#AAA', fontFamily:'Poppins, sans-serif', marginTop:2 }}>Just now</div>
                </div>
              </div>
            )}
          </div>}
        </div>

        {/* Comments */}
        <div style={{ background:'#fff', padding:'16px', marginBottom:8 }}>
          <AmSectionLabel>Comments ({comments.length})</AmSectionLabel>
          {comments.map((c, i) => {
            const u = AM_USERS.find(u => u.id === c.user);
            return (
              <div key={i} style={{ display:'flex', gap:10, marginBottom:12 }}>
                <AmAvatar userId={c.user} size={28} />
                <div style={{ flex:1, background:'#F5F5F5', borderRadius:10, padding:'8px 12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:'#1B1B1B', fontFamily:'Satoshi, sans-serif' }}>{u?.name || '?'}</span>
                    <span style={{ fontSize:10, color:'#AAA', fontFamily:'Poppins, sans-serif' }}>{c.date}</span>
                  </div>
                  <div style={{ fontSize:12, color:'#444', fontFamily:'Poppins, sans-serif', lineHeight:1.5 }}>{renderMentions(c.text)}</div>
                </div>
              </div>
            );
          })}
          {/* Comment input with @-mention */}
          <div style={{ display:'flex', gap:8, marginTop:4, alignItems:'flex-end', position:'relative' }}>
            <AmAvatar userId={AM_CURRENT_USER.id} size={28} />
            <div style={{ flex:1, position:'relative' }}>
              {/* Mention dropdown */}
              {mentionQuery !== null && filteredMentions.length > 0 && (
                <div style={{ position:'absolute', bottom:'100%', left:0, right:0, marginBottom:6,
                  background:'#fff', borderRadius:10, boxShadow:'0 8px 24px rgba(5,33,63,0.14)',
                  border:'1px solid #E8EEF4', overflow:'hidden', zIndex:20 }}>
                  {filteredMentions.map(u => (
                    <button key={u.id} onMouseDown={e => { e.preventDefault(); insertMention(u.name); }}
                      style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
                        border:'none', background:'none', cursor:'pointer', textAlign:'left',
                        borderBottom:'1px solid #F5F5F5' }}>
                      {u.isGroup ? (
                        <div style={{ width:26, height:26, borderRadius:6, background:u.color+'22',
                          border:`1px solid ${u.color}44`, display:'flex', alignItems:'center',
                          justifyContent:'center', flexShrink:0 }}>
                          <span style={{ fontSize:8, fontWeight:700, color:u.color, fontFamily:'Satoshi, sans-serif' }}>{u.initials}</span>
                        </div>
                      ) : (
                        <AmAvatar userId={u.id} size={26} />
                      )}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:600, color:'#1B1B1B', fontFamily:'Satoshi, sans-serif' }}>{u.name}</div>
                        {u.isGroup && <div style={{ fontSize:10, color:'#AAA', fontFamily:'Poppins, sans-serif' }}>Group</div>}
                      </div>
                      <span style={{ fontSize:10, color:'#AAA', fontFamily:'Satoshi, sans-serif' }}>@{u.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              )}
              <div style={{ background:'#F5F5F5', borderRadius:10, padding:'8px 12px', display:'flex', gap:8, alignItems:'flex-end' }}>
                <input ref={commentInputRef} value={commentText} onChange={handleCommentChange}
                  placeholder="Add a comment… use @ to mention"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && mentionQuery === null) handleComment();
                    if (e.key === 'Escape') setMentionQuery(null);
                  }}
                  style={{ flex:1, border:'none', background:'transparent', outline:'none', fontSize:12, fontFamily:'Poppins, sans-serif', color:'#1B1B1B' }} />
                <button onClick={handleComment} disabled={!commentText.trim()} style={{ border:'none', background:'none', cursor: commentText.trim() ? 'pointer' : 'default', padding:0, display:'flex', opacity: commentText.trim() ? 1 : 0.3 }}>
                  <AmIcon.Send s={16} c="#3382C4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div style={{ background:'#fff', padding:'16px', marginBottom:8 }}>
          <AmSectionLabel>Attachments</AmSectionLabel>
          <button style={{ width:'100%', height:60, borderRadius:10, border:'1.5px dashed #DDDDDD', background:'#F5F5F5',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10, cursor:'pointer' }}>
            <AmIcon.Attach s={16} c="#AAA" />
            <span style={{ fontSize:13, color:'#888', fontFamily:'Poppins, sans-serif' }}>Drop file or browse</span>
          </button>
        </div>
        <div style={{ height:90 }} />
      </div>

      {/* Sticky footer action bar */}
      <div style={{ background:'#fff', borderTop:'1px solid #EEEEEE', padding:'10px 12px 30px', flexShrink:0 }}>
        <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none' }}>
          {!completed && action.status !== 'Cancelled' && (
            <AmBtnPrimary sm onClick={handleComplete}>
              <AmIcon.Check s={13} c="#fff" /> Complete
            </AmBtnPrimary>
          )}
          {completed && (
            <div style={{ display:'flex', alignItems:'center', gap:6, padding:'0 12px', height:34, background:'#E8F8F5', borderRadius:10 }}>
              <AmIcon.Check s={13} c="#4CADAF" />
              <span style={{ fontSize:12, color:'#4CADAF', fontWeight:600, fontFamily:'Satoshi, sans-serif', whiteSpace:'nowrap' }}>Completed</span>
            </div>
          )}
          {action.cmms && (
            <AmBtnGhost sm>
              <AmSapBadge /> Send to CMMS
            </AmBtnGhost>
          )}
          <AmBtnGhost sm onClick={() => onEdit && onEdit(action)}>
            <AmIcon.Edit s={12} c="#555" /> Edit
          </AmBtnGhost>
          <AmBtnGhost sm>
            <AmIcon.Export s={12} c="#555" /> PDF
          </AmBtnGhost>
          <AmBtnGhost sm>
            Reassign
          </AmBtnGhost>
          {action.status !== 'Cancelled' && (
            <AmBtnGhost sm>
              <span style={{ color:'#DE1D3F', fontFamily:'Satoshi, sans-serif', fontSize:12, fontWeight:600 }}>Cancel</span>
            </AmBtnGhost>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AmActionDetail });
