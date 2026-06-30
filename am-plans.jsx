// Action Management — Action Creation Form (2-section stepper)

const STEPS = [
{ id: 'details', label: 'Action details' }];


const AM_MOCK_RECORDS = [
{ id: 'EVT-2026-0231', label: 'Chemical spill near storage zone C3', module: 'eEvent', pillar: 'safety' },
{ id: 'TAG-2156', label: 'Conveyor roller wear — Line 4', module: 'TAG+', pillar: 'reliability' },
{ id: 'SMAT-0412', label: 'Unsafe lifting posture observed', module: 'SMAT', pillar: 'safety' },
{ id: 'CHK-1190', label: 'Pressure gauge out of range — Unit 7', module: 'eCheck', pillar: 'risk' },
{ id: 'AUD-0078', label: 'QCP-12B documentation gap', module: 'Audit', pillar: 'quality' },
{ id: 'EHS-0903', label: 'Missing guard on press 2', module: 'EHS', pillar: 'safety' }];


const AM_WORKSHOPS = ['Workshop A', 'Workshop B', 'Line 1', 'Line 2', 'Line 3', 'Line 4', 'Zone C3', 'Zone P1', 'QC Lab'];
const AM_PROCESS_STEPS = ['Assembly', 'Fabrication', 'Packaging', 'Quality Control', 'Storage', 'Shipping'];
const AM_MACHINES = ['Press 1', 'Press 2', 'Conveyor Belt A', 'Paper Roller L1', 'Unit 7 Gauge', 'Forklift Bay'];
const AM_EQUIPMENT_LIST = ['Pump 001', 'Valve A3', 'Motor M12', 'Sensor S-04', 'Roller L1', 'Guard Shield'];

// ─── shared field styles ───────────────────────────────────────────────────
const amCreationFieldStyle = {
  width: '100%', height: 42, padding: '0 12px', borderRadius: 10, border: '1.5px solid #DDDDDD',
  background: '#fff', fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#1B1B1B',
  outline: 'none', boxSizing: 'border-box'
};

const amDarkSelectStyle = {
  width: '100%', height: 46, padding: '0 14px', borderRadius: 10,
  border: '1.5px solid rgba(255,255,255,0.15)',
  background: `rgba(255,255,255,0.07) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 14px center`,
  fontSize: 13, fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.88)',
  outline: 'none', boxSizing: 'border-box', appearance: 'none', cursor: 'pointer', paddingRight: 38
};

// ─── shared primitives ────────────────────────────────────────────────────
const AmFieldRow = ({ label, required, error, hint, children }) =>
<div style={{ marginBottom: 13 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: error ? '#DE1D3F' : '#555',
    fontFamily: 'Satoshi, sans-serif', marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>{label}{required && <span style={{ color: '#DE1D3F' }}> *</span>}</span>
      {hint && <span style={{ fontSize: 10, fontWeight: 500, color: '#999' }}>{hint}</span>}
    </div>
    {children}
    {error && <div style={{ fontSize: 10, color: '#DE1D3F', fontFamily: 'Poppins, sans-serif', marginTop: 3 }}>{error}</div>}
  </div>;


const AmSelect = ({ value, onChange, placeholder, options, error }) =>
<select value={value} onChange={(e) => onChange(e.target.value)}
style={{ ...amCreationFieldStyle, appearance: 'none', cursor: 'pointer', paddingRight: 32,
  borderColor: error ? '#DE1D3F' : '#DDDDDD',
  background: `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 12px center` }}>
    <option value="">{placeholder}</option>
    {options.map((o) => typeof o === 'string' ?
  <option key={o} value={o}>{o}</option> :
  <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>;


// ─── Equipment lookup SVG icons ────────────────────────────────────────────
const EquipScanIcon = () =>
<svg width={68} height={68} viewBox="0 0 80 80" fill="none">
    {/* corner brackets */}
    <rect x="8" y="8" width="22" height="4" rx="2" fill="#3382C4" />
    <rect x="8" y="8" width="4" height="22" rx="2" fill="#3382C4" />
    <rect x="50" y="8" width="22" height="4" rx="2" fill="#3382C4" />
    <rect x="68" y="8" width="4" height="22" rx="2" fill="#3382C4" />
    <rect x="8" y="68" width="22" height="4" rx="2" fill="#3382C4" />
    <rect x="8" y="50" width="4" height="22" rx="2" fill="#3382C4" />
    <rect x="50" y="68" width="22" height="4" rx="2" fill="#3382C4" />
    <rect x="68" y="50" width="4" height="22" rx="2" fill="#3382C4" />
    {/* barcode lines */}
    <rect x="20" y="33" width="4" height="14" rx="2" fill="#3382C4" opacity="0.65" />
    <rect x="28" y="29" width="4" height="22" rx="2" fill="#3382C4" />
    <rect x="36" y="33" width="4" height="14" rx="2" fill="#3382C4" opacity="0.65" />
    <rect x="44" y="27" width="4" height="26" rx="2" fill="#3382C4" />
    <rect x="52" y="33" width="4" height="14" rx="2" fill="#3382C4" opacity="0.65" />
  </svg>;


const EquipMapIcon = () =>
<svg width={68} height={68} viewBox="0 0 80 80" fill="none">
    <path d="M40 10C29 10 20 19 20 30C20 46 40 66 40 66C40 66 60 46 60 30C60 19 51 10 40 10Z" fill="#3382C4" opacity="0.8" />
    <circle cx="40" cy="30" r="9" fill="white" opacity="0.9" />
    <circle cx="40" cy="30" r="4.5" fill="#3382C4" />
  </svg>;


// ─── Main component ───────────────────────────────────────────────────────
const AmCreationSheet = ({ onClose, onCreated, prefillPlanId, editAction }) => {
  const isEdit = !!editAction;
  const [step, setStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [successDraft, setSuccessDraft] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState(false);
  const [recordQuery, setRecordQuery] = React.useState('');
  const [showEquipLookup, setShowEquipLookup] = React.useState(false);
  const [descImages, setDescImages] = React.useState([]);
  const cameraRef = React.useRef();
  const galleryRef = React.useRef();

  const handleImageFiles = (files) => {
    if (!files || !files.length) return;
    const newImgs = Array.from(files).map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    setDescImages((prev) => [...prev, ...newImgs]);
  };
  const removeDescImage = (i) => setDescImages((prev) => prev.filter((_, idx) => idx !== i));

  // Equipment lookup local state (committed to form only on Confirm)
  const [equipKw, setEquipKw] = React.useState('');
  const [equipWS, setEquipWS] = React.useState('');
  const [equipProcess, setEquipProcess] = React.useState('');
  const [equipMachine, setEquipMachine] = React.useState('');
  const [equipEquip, setEquipEquip] = React.useState('');

  const [form, setForm] = React.useState({
    description: editAction?.description || '',
    dueDate: editAction?.due || '',
    priority: editAction?.priority || 'Medium', // ← default Medium
    pillar: editAction?.pillar || '',
    planId: editAction?.planId || prefillPlanId || '',
    moduleType: editAction?.source && editAction.source !== 'Manual' ? 'linked' : 'standalone',
    sourceModule: '', linkedRecord: null,
    assignees: editAction?.assignee ? [editAction.assignee] : [],
    workshop: '', processStep: '', machine: '', equipment: '',
    watchlist: [], hoc: false, sendToSap: editAction?.cmms || false
  });
  const [fav, setFav] = React.useState(false);

  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // ── Validation ──
  const stepErrors = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.description.trim()) e.description = 'Description is required';
      if (!form.dueDate) e.dueDate = 'Due date is required';
      if (!form.priority) e.priority = 'Priority is required';
      if (!form.pillar) e.pillar = 'Category is required';
      if (!form.workshop) e.workshop = 'Workshop selection is required';
      if (form.assignees.length === 0) e.assignees = 'At least one assignee is required';
    }
    return e;
  };
  const stepValid = (s) => Object.keys(stepErrors(s)).length === 0;
  const allValid = () => stepValid(0) && stepValid(1);

  const goNext = () => {
    const e = stepErrors(step);
    if (Object.keys(e).length > 0) {setErrors(e);setTouched(true);return;}
    setErrors({});setTouched(false);setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const goBack = () => {setErrors({});setTouched(false);setStep((s) => Math.max(0, s - 1));};
  const goTo = (i) => {if (i < step) {setErrors({});setTouched(false);setStep(i);}};

  const handleCreate = () => {
    if (!stepValid(0)) {setStep(0);setErrors(stepErrors(0));setTouched(true);return;}
    if (!stepValid(1)) {setStep(1);setErrors(stepErrors(1));setTouched(true);return;}
    setShowSuccess(true);
    const payload = { ...form, assignee: form.assignees[0] || 'u1' };
    setTimeout(() => {onCreated && onCreated(payload);onClose();}, 1800);
  };

  const handleSaveDraft = () => {
    setSuccessDraft(true);setShowSuccess(true);
    const payload = { ...form, assignee: form.assignees[0] || 'u1', asDraft: true };
    setTimeout(() => {onCreated && onCreated(payload);onClose();}, 1500);
  };

  // ── Assignee helpers ──
  const addAssignee = (uid) => {if (uid && !form.assignees.includes(uid)) setF('assignees', [...form.assignees, uid]);};
  const removeAssignee = (uid) => setF('assignees', form.assignees.filter((x) => x !== uid));
  const toggleSelf = () => {
    const me = AM_CURRENT_USER.id;
    setF('assignees', form.assignees.includes(me) ?
    form.assignees.filter((x) => x !== me) :
    [me, ...form.assignees.filter((x) => x !== me)]);
  };
  const SUGGESTED = 'u3';

  // ── Record search ──
  const selectRecord = (rec) => {
    setForm((f) => ({ ...f, linkedRecord: rec, pillar: rec.pillar }));
    setRecordQuery('');
  };
  const filteredRecords = AM_MOCK_RECORDS.
  filter((r) => !form.sourceModule || r.module === form.sourceModule).
  filter((r) => !recordQuery || (r.id + ' ' + r.label).toLowerCase().includes(recordQuery.toLowerCase()));

  // ── Equipment lookup helpers ──
  const openEquipLookup = () => {
    setEquipWS(form.workshop || '');
    setEquipProcess(form.processStep || '');
    setEquipMachine(form.machine || '');
    setEquipEquip(form.equipment || '');
    setEquipKw('');
    setShowEquipLookup(true);
  };
  const confirmEquipment = () => {
    setForm((f) => ({ ...f, workshop: equipWS, processStep: equipProcess, machine: equipMachine, equipment: equipEquip }));
    setShowEquipLookup(false);
  };
  const clearEquipment = (e) => {
    e.stopPropagation();
    setForm((f) => ({ ...f, workshop: '', processStep: '', machine: '', equipment: '' }));
  };
  const equipLabel = () => [form.workshop, form.processStep, form.machine, form.equipment].filter(Boolean).join(' › ');

  // ── Success screen ──
  if (showSuccess) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: successDraft ? '#F0F0F0' : '#E8F8F5',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AmIcon.Check s={36} c={successDraft ? '#999' : '#4CADAF'} />
      </div>
      <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 700, color: '#1B1B1B', textAlign: 'center' }}>
        {successDraft ? 'Draft saved' : isEdit ? 'Changes saved' : 'Action created'}
      </div>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 1.5 }}>
        {successDraft ?
        <>Saved to your drafts. You can finish<br />and submit it later.</> :
        <>Notifications sent to assignees and watchlist.<br />Returning to dashboard…</>}
      </div>
    </div>);


  const lastStep = step === STEPS.length - 1;

  // ── Step content ──────────────────────────────────────────────────────────
  const stepContent = (s) => {
    if (s === 0) return (
      <div>
        {/* Description */}
        <AmFieldRow label="Action description" required error={touched && errors.description}>
          {/* Hidden file inputs */}
          <input ref={cameraRef} type="file" accept="image/*" capture="environment"
          onChange={(e) => handleImageFiles(e.target.files)}
          style={{ display: 'none' }} />
          <input ref={galleryRef} type="file" accept="image/*" multiple
          onChange={(e) => handleImageFiles(e.target.files)}
          style={{ display: 'none' }} />

          <div style={{ border: `1.5px solid ${touched && errors.description ? '#DE1D3F' : '#DDDDDD'}`, borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
            <textarea value={form.description} onChange={(e) => setF('description', e.target.value)}
            placeholder="Describe the action clearly and concisely…"
            rows={3} style={{ ...amCreationFieldStyle, height: 'auto', padding: '10px 12px', resize: 'none', lineHeight: 1.5,
              border: 'none', borderRadius: 0, outline: 'none' }} />

            {/* Image thumbnails */}
            {descImages.length > 0 &&
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 10px 8px' }}>
                {descImages.map((img, i) =>
              <div key={i} style={{ position: 'relative', width: 56, height: 56, borderRadius: 8, overflow: 'hidden',
                border: '1.5px solid #E0E0E0', flexShrink: 0 }}>
                    <img src={img.url} alt={img.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <button onClick={() => removeDescImage(i)}
                style={{ position: 'absolute', top: 2, right: 2, width: 16, height: 16, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.55)', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                      <AmIcon.X s={9} c="#fff" />
                    </button>
                  </div>
              )}
              </div>
            }

            {/* Attachment toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '5px 8px', borderTop: '1px solid #F0F0F0' }}>
              <button onClick={() => cameraRef.current.click()}
              style={{ display: 'flex', alignItems: 'center', gap: 5, border: 'none', background: 'none',
                cursor: 'pointer', padding: '5px 8px', borderRadius: 7,
                fontSize: 11, fontFamily: 'Satoshi, sans-serif', fontWeight: 600, color: '#555' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Take photo
              </button>
              <button onClick={() => galleryRef.current.click()}
              style={{ display: 'flex', alignItems: 'center', gap: 5, border: 'none', background: 'none',
                cursor: 'pointer', padding: '5px 8px', borderRadius: 7,
                fontSize: 11, fontFamily: 'Satoshi, sans-serif', fontWeight: 600, color: '#555' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                Attach image
              </button>
            </div>
          </div>
        </AmFieldRow>

        {/* Category */}
        <AmFieldRow label="Category" required error={touched && errors.pillar}>
          {form.linkedRecord && form.pillar ?
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 42, padding: '0 12px',
            borderRadius: 10, border: '1.5px solid #C5DCEF', background: '#F7F9FA' }}>
              <AmCategoryDot pillarId={form.pillar} withName />
              <span style={{ fontSize: 10, color: '#3382C4', fontFamily: 'Satoshi, sans-serif', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 4 }}>
                <AmIcon.Sparkle s={11} c="#3382C4" /> Auto-filled
              </span>
            </div> :

          <AmSelect value={form.pillar} onChange={(v) => setF('pillar', v)} placeholder="Select category…"
          error={touched && errors.pillar}
          options={(window.AM_CATEGORIES || AM_CATEGORIES).map((p) => ({ value: p.id, label: p.name }))} />
          }
        </AmFieldRow>

        {/* Due date */}
        <AmFieldRow label="Due date" required error={touched && errors.dueDate}>
          <input type="date" value={form.dueDate} onChange={(e) => setF('dueDate', e.target.value)}
          style={{ ...amCreationFieldStyle, borderColor: touched && errors.dueDate ? '#DE1D3F' : '#DDDDDD' }} />
        </AmFieldRow>

        {/* Priority — default Medium, escalation warning for Critical */}
        <AmFieldRow label="Priority" required error={touched && errors.priority}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Critical', 'High', 'Medium', 'Low'].map((p) => {
              const cfg = AM_PRIORITY_CFG[p];
              const active = form.priority === p;
              return (
                <button key={p} onClick={() => setF('priority', p)}
                style={{ flex: 1, height: 42, borderRadius: 10,
                  border: `1.5px solid ${active ? cfg.color : touched && errors.priority ? '#DE1D3F' : '#DDDDDD'}`,
                  background: active ? cfg.color + '18' : '#fff', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <AmPriorityTriangle priority={p} size={12} />
                  <span style={{ fontSize: 9, fontWeight: 700, fontFamily: 'Satoshi, sans-serif',
                    color: active ? cfg.color : '#888' }}>{p}</span>
                </button>);

            })}
          </div>
          {form.priority === 'Critical' &&
          <div style={{ marginTop: 7, display: 'flex', alignItems: 'flex-start', gap: 7, padding: '8px 10px',
            background: '#FFF4F6', borderRadius: 8, border: '1px solid #F5C2CC' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              fill="#DE1D3F" opacity="0.15" stroke="#DE1D3F" strokeWidth="2" />
                <line x1="12" y1="9" x2="12" y2="13" stroke="#DE1D3F" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="#DE1D3F" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 10, color: '#B41E3A', fontFamily: 'Poppins, sans-serif', lineHeight: 1.45 }}>
                Critical priority triggers immediate escalation. Confirm this is truly urgent before proceeding.
              </span>
            </div>
          }
        </AmFieldRow>

        {/* Action plan — only shown (read-only) when pre-filled from a plan context */}
        {form.planId &&
        <AmFieldRow label="Action plan" hint="Auto-filled">
            <div style={{ height: 42, padding: '0 12px', borderRadius: 10, border: '1.5px solid #C5DCEF',
            background: '#F7F9FA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontFamily: 'Poppins, sans-serif', color: '#1B1B1B' }}>
                {AM_PLANS_INIT.find((p) => p.id === form.planId)?.title || form.planId}
              </span>
              <span style={{ fontSize: 10, color: '#3382C4', fontFamily: 'Satoshi, sans-serif', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 4 }}>
                <AmIcon.Sparkle s={11} c="#3382C4" /> Auto-filled
              </span>
            </div>
          </AmFieldRow>
        }



        <AmDivider my={4} />

        {/* Structure / Equipment — required, Workshop mandatory */}
        <AmFieldRow label="Structure / Equipment" required error={touched && errors.workshop}>
          <button onClick={openEquipLookup}
          style={{ width: '100%', height: 42, padding: '0 12px', borderRadius: 10, cursor: 'pointer', boxSizing: 'border-box',
            border: `1.5px solid ${touched && errors.workshop ? '#DE1D3F' : form.workshop ? '#3382C4' : '#DDDDDD'}`,
            background: form.workshop ? '#EAF2FA' : '#fff',
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 13, fontFamily: 'Poppins, sans-serif', color: form.workshop ? '#1B1B1B' : '#999' }}>
            <AmIcon.QR s={16} c={form.workshop ? '#3382C4' : '#BBBBBB'} />
            {form.workshop ?
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>{equipLabel()}</span> :
            <span style={{ flex: 1, textAlign: 'left' }}>Select workshop</span>}
            {form.workshop ?
            <span onClick={clearEquipment} style={{ display: 'flex', padding: 4, marginRight: -4 }}><AmIcon.X s={13} c="#888" /></span> :
            <AmIcon.ChevR s={14} c="#CCC" />}
          </button>
        </AmFieldRow>

        <AmDivider my={4} />

        {/* Assignee — ProSkill card + dropdown */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:600, fontFamily:'Satoshi, sans-serif', marginBottom:5,
            display:'flex', alignItems:'center', justifyContent:'space-between',
            color:(touched && errors.assignees)?'#DE1D3F':'#555' }}>
            <span>Assignee(s)<span style={{ color:'#DE1D3F' }}> *</span></span>
            <span style={{ fontSize:10, fontWeight:500, color:'#999' }}>Multi-select</span>
          </div>

          {/* ProSkill suggestion card */}
          {!form.assignees.includes(SUGGESTED) && (
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
              background:'#EAF2FA', borderRadius:10, border:'1px solid #C5DCEF', marginBottom:8 }}>
              <AmAvatar userId={SUGGESTED} size={32} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:1 }}>
                  <AmIcon.Sparkle s={11} c="#3382C4" />
                  <span style={{ fontSize:9, fontWeight:700, color:'#3382C4', fontFamily:'Satoshi, sans-serif',
                    textTransform:'uppercase', letterSpacing:'0.08em' }}>ProSkill match</span>
                </div>
                <div style={{ fontSize:12, fontWeight:600, color:'#1B1B1B', fontFamily:'Satoshi, sans-serif' }}>
                  <AmUserName userId={SUGGESTED} />
                </div>
                <div style={{ fontSize:10, color:'#3382C4', fontFamily:'Poppins, sans-serif' }}>94% skill match · FR-Lyon</div>
              </div>
              <button onClick={() => addAssignee(SUGGESTED)}
                style={{ padding:'6px 14px', borderRadius:8, border:'1.5px solid #3382C4', flexShrink:0,
                  background:'#fff', color:'#3382C4',
                  fontSize:11, fontWeight:600, fontFamily:'Satoshi, sans-serif', cursor:'pointer' }}>
                + Add
              </button>
            </div>
          )}

          {/* Dropdown for other assignees */}
          <AmSelect value="" onChange={addAssignee}
            placeholder={form.assignees.length > 0 ? 'Add another assignee…' : 'Add assignee…'}
            error={touched && errors.assignees}
            options={AM_USERS.filter(u => !form.assignees.includes(u.id) && u.id !== SUGGESTED).map(u => ({ value:u.id, label:u.name }))} />

          {/* Assign-to-myself shortcut */}
          <button onClick={toggleSelf}
            style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:7,
              border:'none', background:'none', cursor:'pointer', padding:0 }}>
            <div style={{ width:16, height:16, borderRadius:4, flexShrink:0,
              border:`1.5px solid ${form.assignees.includes(AM_CURRENT_USER.id) ? '#3382C4' : '#CCCCCC'}`,
              background: form.assignees.includes(AM_CURRENT_USER.id) ? '#3382C4' : '#fff',
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              {form.assignees.includes(AM_CURRENT_USER.id) && <AmIcon.Check s={10} c="#fff" />}
            </div>
            <span style={{ fontSize:12, fontFamily:'Satoshi, sans-serif', fontWeight:500,
              color: form.assignees.includes(AM_CURRENT_USER.id) ? '#3382C4' : '#555' }}>
              Assign to myself ({AM_CURRENT_USER.name})
            </span>
          </button>

          {/* Selected assignee tags */}
          {form.assignees.length > 0 && (
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:8 }}>
              {form.assignees.map(uid => (
                <div key={uid} style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 8px 3px 4px',
                  background:'#EAF2FA', borderRadius:999, border:'1px solid #C5DCEF' }}>
                  <AmAvatar userId={uid} size={18} />
                  <span style={{ fontSize:11, color:'#3382C4', fontFamily:'Satoshi, sans-serif', fontWeight:500 }}>
                    <AmUserName userId={uid} firstOnly />
                  </span>
                  {uid === SUGGESTED && (
                    <span style={{ fontSize:8, fontWeight:700, color:'#3382C4', background:'rgba(51,130,196,0.15)',
                      padding:'1px 4px', borderRadius:3, fontFamily:'Satoshi, sans-serif', letterSpacing:'0.03em' }}>PRO</span>
                  )}
                  <button onClick={() => removeAssignee(uid)}
                    style={{ border:'none', background:'none', cursor:'pointer', padding:0, display:'flex', marginLeft:2 }}>
                    <AmIcon.X s={11} c="#3382C4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {(touched && errors.assignees) && <div style={{ fontSize:10, color:'#DE1D3F', fontFamily:'Poppins, sans-serif', marginTop:3 }}>{errors.assignees}</div>}
        </div>

        <AmDivider my={4} />

        {/* Watchlist */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, fontWeight:600, fontFamily:'Satoshi, sans-serif', marginBottom:5,
            display:'flex', alignItems:'center', justifyContent:'space-between', color:'#555' }}>
            <span>Watchlist</span>
            <span style={{ fontSize:10, fontWeight:500, color:'#999' }}>Optional</span>
          </div>
          <AmSelect value="" onChange={v => { if (v && !form.watchlist.includes(v)) setF('watchlist', [...form.watchlist, v]); }}
            placeholder="Add team member…"
            options={AM_USERS.filter(u => !form.watchlist.includes(u.id)).map(u => ({ value:u.id, label:u.name }))} />
          {form.watchlist.length > 0 && (
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:8 }}>
              {form.watchlist.map(uid => (
                <div key={uid} style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 8px 3px 4px',
                  background:'#F5F5F5', borderRadius:999, border:'1px solid #E0E0E0' }}>
                  <AmAvatar userId={uid} size={18} />
                  <span style={{ fontSize:11, color:'#555', fontFamily:'Satoshi, sans-serif', fontWeight:500 }}>
                    <AmUserName userId={uid} firstOnly />
                  </span>
                  <button onClick={() => setF('watchlist', form.watchlist.filter(x => x !== uid))}
                    style={{ border:'none', background:'none', cursor:'pointer', padding:0, display:'flex', marginLeft:2 }}>
                    <AmIcon.X s={11} c="#AAA" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>);

  };

  // ── Shell ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

      {/* Header */}
      <div style={{ padding: '14px 14px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <AmIcon.X s={20} c="#555" />
          </button>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 700, color: '#1B1B1B' }}>
            {isEdit ? 'Edit action' : 'New action'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={handleSaveDraft}
            style={{ height: 30, padding: '0 12px', borderRadius: 8, border: '1.5px solid #DDDDDD',
              background: '#fff', cursor: 'pointer', fontSize: 11, fontWeight: 600,
              fontFamily: 'Satoshi, sans-serif', color: '#555', whiteSpace: 'nowrap' }}>
              Save draft
            </button>
            <button onClick={() => setFav((f) => !f)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
              <AmIcon.Heart s={18} filled={fav} />
            </button>
          </div>
        </div>

        {/* Progress bar — hidden for single-step form */}
        {STEPS.length > 1 &&
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {STEPS.map((s, i) =>
          <div key={s.id} onClick={() => goTo(i)}
          style={{ height: 4, flex: 1, borderRadius: 999, transition: 'background 200ms',
            background: i <= step ? '#3382C4' : '#DDDDDD',
            opacity: i > step ? 0.5 : 1, cursor: i < step ? 'pointer' : 'default' }} />
          )}
          </div>
        }

        {/* Section label — hidden for single-step form */}
        {STEPS.length > 1 &&
        <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'Satoshi, sans-serif', fontSize: 10, fontWeight: 700, color: '#888',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>
              Section {step + 1} of {STEPS.length}
            </div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 700, color: '#1B1B1B', lineHeight: 1.25 }}>
              {STEPS[step].label}
            </div>
          </div>
        }
      </div>

      {/* Scrollable content — paddingBottom matches sticky footer height */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px', WebkitOverflowScrolling: 'touch' }}>
        {stepContent(step)}
        <div style={{ height: 64 }} />
      </div>

      {/* Sticky footer */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #EEEEEE', background: '#fff', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
          {step > 0 &&
          <AmBtnGhost onClick={goBack}>
              <AmIcon.Back s={14} c="#555" /> Back
            </AmBtnGhost>
          }
          <div style={{ flex: 1 }}>
            {!lastStep ?
            <AmBtnPrimary onClick={goNext} full>Continue <AmIcon.ChevR s={14} c="#fff" /></AmBtnPrimary> :
            <AmBtnPrimary onClick={handleCreate} disabled={!allValid()} full>
                  <AmIcon.Check s={14} c="#fff" /> {isEdit ? 'Save changes' : 'Create action'}
                </AmBtnPrimary>}
          </div>
        </div>
        {touched && !stepValid(step) &&
        <div style={{ marginTop: 8, fontSize: 11, color: '#DE1D3F', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
            Fill the required fields to continue
          </div>
        }
        {lastStep && !allValid() &&
        <div style={{ marginTop: 8, fontSize: 11, color: '#DE1D3F', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>Required fields are missing

        </div>
        }
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
           EQUIPMENT LOOKUP — full-screen dark overlay
           ══════════════════════════════════════════════════════════════════ */}
      {showEquipLookup &&
      <div style={{ position: 'absolute', inset: 0, background: '#191E2B', zIndex: 20, display: 'flex',
        flexDirection: 'column', animation: 'slideRight 220ms ease-out' }}>

          {/* Header */}
          <div style={{ padding: '52px 24px 18px', flexShrink: 0, textAlign: 'center', position: 'relative' }}>
            <button onClick={() => setShowEquipLookup(false)}
          style={{ position: 'absolute', top: 16, left: 16, border: 'none', background: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
              <AmIcon.X s={20} c="rgba(255,255,255,0.55)" />
            </button>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              Equipment Lookup
            </div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11.5, color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.6, maxWidth: 270, margin: '0 auto' }}>
              Search for your equipment by function location, keyword, navigating the site map, or by scanning the equipment's QR code.
            </div>
          </div>

          {/* Scrollable body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px', WebkitOverflowScrolling: 'touch' }}>

            {/* Keyword search */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)',
              fontFamily: 'Satoshi, sans-serif', marginBottom: 8 }}>Keyword:</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff',
              borderRadius: 10, padding: '0 14px', height: 46 }}>
                <AmIcon.Search s={16} c="#999" />
                <input value={equipKw} onChange={(e) => setEquipKw(e.target.value)}
              placeholder="Search by Equipment Name or #"
              style={{ flex: 1, border: 'none', outline: 'none',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#1B1B1B', background: 'transparent' }} />
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 22 }} />

            {/* QR + Map shortcuts */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginBottom: 22 }}>
              {[['Scan your QR/BAR Code', <EquipScanIcon />], ['Pinpoint on a Map', <EquipMapIcon />]].map(([lbl, icon]) =>
            <button key={lbl} style={{ background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: 0 }}>
                  {icon}
                  <span style={{ fontSize: 12, color: '#3382C4', fontFamily: 'Poppins, sans-serif', fontWeight: 500, textAlign: 'center', maxWidth: 110 }}>{lbl}</span>
                </button>
            )}
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 22 }} />

            {/* By Function Location */}
            <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#3382C4',
            fontFamily: 'Satoshi, sans-serif', marginBottom: 20, letterSpacing: '0.01em' }}>
              By Function Location
            </div>

            {/* Workshop — required */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Satoshi, sans-serif', marginBottom: 7,
              color: 'rgba(255,255,255,0.85)' }}>
                Workshop:<span style={{ color: '#DE1D3F' }}> *</span>
              </div>
              <select value={equipWS} onChange={(e) => setEquipWS(e.target.value)} style={amDarkSelectStyle}>
                <option value="" style={{ background: '#191E2B', color: 'rgba(255,255,255,0.4)' }}>Select your Workshop</option>
                {AM_WORKSHOPS.map((w) => <option key={w} value={w} style={{ background: '#191E2B' }}>{w}</option>)}
              </select>
            </div>

            {/* Process Step/Area — optional */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Satoshi, sans-serif', marginBottom: 7,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>Process Step / Area:</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 400, fontFamily: 'Poppins' }}>Optional</span>
              </div>
              <select value={equipProcess} onChange={(e) => setEquipProcess(e.target.value)} style={amDarkSelectStyle}>
                <option value="" style={{ background: '#191E2B' }}>Select your Process Step / Area</option>
                {AM_PROCESS_STEPS.map((p) => <option key={p} value={p} style={{ background: '#191E2B' }}>{p}</option>)}
              </select>
            </div>

            {/* Machine/Workstation — optional */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Satoshi, sans-serif', marginBottom: 7,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>Machine / Workstation:</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 400, fontFamily: 'Poppins' }}>Optional</span>
              </div>
              <select value={equipMachine} onChange={(e) => setEquipMachine(e.target.value)} style={amDarkSelectStyle}>
                <option value="" style={{ background: '#191E2B' }}>Select your Machine / Workstation</option>
                {AM_MACHINES.map((m) => <option key={m} value={m} style={{ background: '#191E2B' }}>{m}</option>)}
              </select>
            </div>

            {/* Equipment — optional */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Satoshi, sans-serif', marginBottom: 7,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>Equipment:</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 400, fontFamily: 'Poppins' }}>Optional</span>
              </div>
              <select value={equipEquip} onChange={(e) => setEquipEquip(e.target.value)} style={amDarkSelectStyle}>
                <option value="" style={{ background: '#191E2B' }}>Select your Equipment</option>
                {AM_EQUIPMENT_LIST.map((eq) => <option key={eq} value={eq} style={{ background: '#191E2B' }}>{eq}</option>)}
              </select>
            </div>

            {/* Selection preview */}
            {equipWS &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, padding: '10px 14px',
            background: 'rgba(51,130,196,0.14)', borderRadius: 10, border: '1px solid rgba(51,130,196,0.28)' }}>
                <AmIcon.Check s={14} c="#3382C4" />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: 'Poppins, sans-serif', lineHeight: 1.4 }}>
                  {[equipWS, equipProcess, equipMachine, equipEquip].filter(Boolean).join(' › ')}
                </span>
              </div>
          }

            <div style={{ height: 16 }} />
          </div>

          {/* Footer */}
          <div style={{ padding: '12px 20px 16px', borderTop: '1px solid rgba(255,255,255,0.08)',
          background: '#141824', flexShrink: 0 }}>
            <AmBtnPrimary full onClick={confirmEquipment} disabled={!equipWS}>
              <AmIcon.Check s={14} c="#fff" /> Confirm selection
            </AmBtnPrimary>
            {!equipWS &&
          <div style={{ marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.3)',
            fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
                Workshop selection is required to continue
              </div>
          }
          </div>
        </div>
      }
    </div>);

};

Object.assign(window, { AmCreationSheet });