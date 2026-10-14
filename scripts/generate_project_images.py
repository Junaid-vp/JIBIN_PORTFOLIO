import subprocess
import os
from PIL import Image

output_dir = "/Users/junaid.vp/Desktop/Jibin Broh/jibin-portfolio/public/projects"
os.makedirs(output_dir, exist_ok=True)

projects = [
    {
        "filename": "dashboard.jpg",
        "title": "Operational Performance Dashboard",
        "category": "BI & KPI REPORTING",
        "badge": "POWER BI ENTERPRISE",
        "kpis": [
            {"label": "TOTAL THROUGHPUT", "val": "4.2M", "sub": "rows processed", "change": "+28.4%", "pos": True},
            {"label": "AVG QUERY SPEED", "val": "1.2s", "sub": "-82% latency", "change": "Optimized", "pos": True},
            {"label": "REPORTING SLA", "val": "99.8%", "sub": "on-time refresh", "change": "Target Met", "pos": True},
        ],
        "chart_title": "Daily Operational Throughput vs Latency Baseline",
        "chart_type": "area_bars",
        "accent": "#2563EB",
        "accent_light": "#38BDF8",
        "accent_green": "#10B981"
    },
    {
        "filename": "kpi.jpg",
        "title": "Management KPI & Reporting System",
        "category": "EXECUTIVE INSIGHTS",
        "badge": "EXECUTIVE DECISION SUPPORT",
        "kpis": [
            {"label": "DECISION VELOCITY", "val": "40%", "sub": "faster cycle time", "change": "+40%", "pos": True},
            {"label": "CENTRALIZED KPIS", "val": "142", "sub": "live corporate metrics", "change": "100% Synced", "pos": True},
            {"label": "DATA ACCURACY", "val": "99.9%", "sub": "governed models", "change": "Optimal", "pos": True},
        ],
        "chart_title": "Departmental Performance & KPI Fulfillment",
        "chart_type": "rings_bars",
        "accent": "#38BDF8",
        "accent_light": "#67E8F9",
        "accent_green": "#10B981"
    },
    {
        "filename": "erp.jpg",
        "title": "ERP Data Analytics & Integrity Monitor",
        "category": "ERP & DATA QUALITY",
        "badge": "DELTEK VANTAGEPOINT & SQL",
        "kpis": [
            {"label": "DISCREPANCY RATE", "val": "0.00%", "sub": "zero variance", "change": "-20% Diff", "pos": True},
            {"label": "RECONCILED RECORDS", "val": "1.84M", "sub": "general ledger audits", "change": "Verified", "pos": True},
            {"label": "SYNC PIPELINE", "val": "42ms", "sub": "real-time ETL check", "change": "Healthy", "pos": True},
        ],
        "chart_title": "SQL Data Validation & Reconciliation Pipeline",
        "chart_type": "erp_table",
        "accent": "#2563EB",
        "accent_light": "#38BDF8",
        "accent_green": "#10B981"
    },
    {
        "filename": "workflow.jpg",
        "title": "Automated Reporting Workflow",
        "category": "AUTOMATION",
        "badge": "SHAREPOINT & NINTEX ENGINE",
        "kpis": [
            {"label": "MANUAL EFFORT", "val": "-35%", "sub": "hours saved / week", "change": "-35% Effort", "pos": True},
            {"label": "ACTIVE PIPELINES", "val": "28", "sub": "automated workflows", "change": "24/7 Active", "pos": True},
            {"label": "TRIGGER SUCCESS", "val": "100%", "sub": "zero missed dispatches", "change": "Flawless", "pos": True},
        ],
        "chart_title": "End-to-End Orchestration & Data Distribution Graph",
        "chart_type": "workflow_nodes",
        "accent": "#38BDF8",
        "accent_light": "#06B6D4",
        "accent_green": "#10B981"
    },
    {
        "filename": "analytics.jpg",
        "title": "Data Quality & Support Analytics",
        "category": "ANALYTICS OPERATIONS",
        "badge": "BI GATEWAY & INFRASTRUCTURE",
        "kpis": [
            {"label": "DASHBOARD UPTIME", "val": "99.98%", "sub": "enterprise availability", "change": "99%+ SLA", "pos": True},
            {"label": "SCHEDULED REFRESHES", "val": "48/48", "sub": "daily successful runs", "change": "0 Failures", "pos": True},
            {"label": "USER SATISFACTION", "val": "4.9/5", "sub": "Tier-1/2 resolution", "change": "+15% YoY", "pos": True},
        ],
        "chart_title": "Live Gateway Telemetry & System Health Pulse",
        "chart_type": "telemetry_pulse",
        "accent": "#10B981",
        "accent_light": "#34D399",
        "accent_green": "#38BDF8"
    },
    {
        "filename": "database.jpg",
        "title": "Temporal Database Solution",
        "category": "DATABASE ARCHITECTURE",
        "badge": "ORACLE SQL & TIME-SERIES",
        "kpis": [
            {"label": "QUERY SPEEDUP", "val": "3.2x", "sub": "indexed partitions", "change": "+320% Faster", "pos": True},
            {"label": "ROW VERSIONING", "val": "100%", "sub": "temporal AS OF audits", "change": "Complete", "pos": True},
            {"label": "HISTORICAL ACCURACY", "val": "Microsec", "sub": "effective/expiry dates", "change": "Verified", "pos": True},
        ],
        "chart_title": "Temporal Row Versioning & Historical AS OF Architecture",
        "chart_type": "database_schema",
        "accent": "#2563EB",
        "accent_light": "#38BDF8",
        "accent_green": "#10B981"
    }
]

def generate_html(p):
    kpis_html = ""
    for k in p["kpis"]:
        kpis_html += f"""
        <div class="kpi-card">
            <div class="kpi-top">
                <span class="kpi-label">{k['label']}</span>
                <span class="kpi-badge">{k['change']}</span>
            </div>
            <div class="kpi-val">{k['val']}</div>
            <div class="kpi-sub">{k['sub']}</div>
        </div>
        """

    # Visual section based on type
    if p["chart_type"] == "area_bars":
        visual_html = f"""
        <div class="chart-container">
            <div class="chart-header">
                <div>
                    <span class="chart-title">{p['chart_title']}</span>
                    <span class="chart-sub">Real-Time BI Telemetry Feed</span>
                </div>
                <div class="chart-legend">
                    <span class="legend-item"><span class="dot blue"></span> Throughput Volume</span>
                    <span class="legend-item"><span class="dot green"></span> Target SLA</span>
                </div>
            </div>
            <div class="chart-body">
                <svg viewBox="0 0 760 260" class="svg-chart">
                    <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="{p['accent_light']}" stop-opacity="0.35"/>
                            <stop offset="60%" stop-color="{p['accent']}" stop-opacity="0.10"/>
                            <stop offset="100%" stop-color="{p['accent']}" stop-opacity="0.0"/>
                        </linearGradient>
                    </defs>
                    <line x1="0" y1="60" x2="760" y2="60" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4"/>
                    <line x1="0" y1="130" x2="760" y2="130" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4"/>
                    <line x1="0" y1="200" x2="760" y2="200" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4"/>
                    
                    <!-- Area Fill -->
                    <path d="M 20,210 Q 90,170 160,180 T 300,120 T 440,140 T 580,70 T 740,85 L 740,240 L 20,240 Z" fill="url(#areaGrad)"/>
                    
                    <!-- Line 1: Primary Throughput -->
                    <path d="M 20,210 Q 90,170 160,180 T 300,120 T 440,140 T 580,70 T 740,85" fill="none" stroke="{p['accent_light']}" stroke-width="3.5"/>
                    
                    <!-- Line 2: Emerald Benchmark -->
                    <path d="M 20,230 Q 90,205 160,200 T 300,170 T 440,165 T 580,120 T 740,110" fill="none" stroke="{p['accent_green']}" stroke-width="2.5" stroke-dasharray="6 4"/>
                    
                    <!-- Glowing Nodes -->
                    <circle cx="300" cy="120" r="5" fill="#38BDF8" stroke="#0B0F19" stroke-width="2"/>
                    <circle cx="580" cy="70" r="6" fill="#38BDF8" stroke="#FFFFFF" stroke-width="2"/>
                    <circle cx="740" cy="85" r="5" fill="#38BDF8" stroke="#0B0F19" stroke-width="2"/>
                </svg>
                <div class="bars-strip">
                    <div class="bar-col"><div class="bar-fill" style="height: 45%;"></div><span>08:00</span></div>
                    <div class="bar-col"><div class="bar-fill" style="height: 65%;"></div><span>10:00</span></div>
                    <div class="bar-col"><div class="bar-fill" style="height: 85%;"></div><span>12:00</span></div>
                    <div class="bar-col"><div class="bar-fill" style="height: 98%;"></div><span>14:00</span></div>
                    <div class="bar-col"><div class="bar-fill" style="height: 75%;"></div><span>16:00</span></div>
                    <div class="bar-col"><div class="bar-fill" style="height: 88%;"></div><span>18:00</span></div>
                </div>
            </div>
        </div>
        """

    elif p["chart_type"] == "rings_bars":
        visual_html = f"""
        <div class="chart-container">
            <div class="chart-header">
                <div>
                    <span class="chart-title">{p['chart_title']}</span>
                    <span class="chart-sub">Cross-Department KPI Distribution</span>
                </div>
            </div>
            <div class="rings-grid">
                <div class="ring-card">
                    <svg width="110" height="110" class="ring-svg">
                        <circle cx="55" cy="55" r="42" stroke="rgba(255,255,255,0.08)" stroke-width="9" fill="none"/>
                        <circle cx="55" cy="55" r="42" stroke="{p['accent_light']}" stroke-width="9" fill="none" stroke-dasharray="264" stroke-dashoffset="32" stroke-linecap="round"/>
                    </svg>
                    <div class="ring-val">94%</div>
                    <div class="ring-lbl">Sales & Revenue</div>
                </div>
                <div class="ring-card">
                    <svg width="110" height="110" class="ring-svg">
                        <circle cx="55" cy="55" r="42" stroke="rgba(255,255,255,0.08)" stroke-width="9" fill="none"/>
                        <circle cx="55" cy="55" r="42" stroke="{p['accent_green']}" stroke-width="9" fill="none" stroke-dasharray="264" stroke-dashoffset="18" stroke-linecap="round"/>
                    </svg>
                    <div class="ring-val">98%</div>
                    <div class="ring-lbl">Financial Audits</div>
                </div>
                <div class="ring-card">
                    <svg width="110" height="110" class="ring-svg">
                        <circle cx="55" cy="55" r="42" stroke="rgba(255,255,255,0.08)" stroke-width="9" fill="none"/>
                        <circle cx="55" cy="55" r="42" stroke="{p['accent']}" stroke-width="9" fill="none" stroke-dasharray="264" stroke-dashoffset="46" stroke-linecap="round"/>
                    </svg>
                    <div class="ring-val">91%</div>
                    <div class="ring-lbl">Operations SLA</div>
                </div>
                <div class="ring-card">
                    <svg width="110" height="110" class="ring-svg">
                        <circle cx="55" cy="55" r="42" stroke="rgba(255,255,255,0.08)" stroke-width="9" fill="none"/>
                        <circle cx="55" cy="55" r="42" stroke="#A78BFA" stroke-width="9" fill="none" stroke-dasharray="264" stroke-dashoffset="24" stroke-linecap="round"/>
                    </svg>
                    <div class="ring-val">96%</div>
                    <div class="ring-lbl">Executive MIS</div>
                </div>
            </div>
            <div class="bars-horizontal">
                <div class="hbar-item"><span>Power BI Dashboards</span><div class="hbar-track"><div class="hbar-fill" style="width: 95%;"></div></div><span>95%</span></div>
                <div class="hbar-item"><span>DAX Metric Calculations</span><div class="hbar-track"><div class="hbar-fill green" style="width: 92%;"></div></div><span>92%</span></div>
                <div class="hbar-item"><span>Automated Refresh Compliance</span><div class="hbar-track"><div class="hbar-fill" style="width: 99%;"></div></div><span>99%</span></div>
            </div>
        </div>
        """

    elif p["chart_type"] == "erp_table":
        visual_html = f"""
        <div class="chart-container">
            <div class="chart-header">
                <div>
                    <span class="chart-title">{p['chart_title']}</span>
                    <span class="chart-sub">Deltek Vantagepoint & SQL Database Reconciliation</span>
                </div>
                <span class="status-pill green">● Live Zero Discrepancy</span>
            </div>
            <div class="sql-code-box">
                <span class="kw">SELECT</span> account_code, SUM(erp_amt), SUM(gl_amt), <span class="fn">ABS</span>(erp_amt - gl_amt) <span class="kw">AS</span> variance<br/>
                <span class="kw">FROM</span> deltek_vantagepoint_ledger <span class="kw">HAVING</span> variance = 0 <span class="kw">ORDER BY</span> posted_date <span class="kw">DESC</span>;
            </div>
            <table class="data-table">
                <thead>
                    <tr><th>ENTITY ID</th><th>ACCOUNT</th><th>RECONCILED AMOUNT</th><th>STATUS</th><th>INTEGRITY</th></tr>
                </thead>
                <tbody>
                    <tr><td>ERP-4091</td><td>Operating Revenue</td><td>$1,420,850.00</td><td><span class="badge-ok">VERIFIED</span></td><td><span class="pct">100%</span></td></tr>
                    <tr><td>ERP-4092</td><td>Consulting Fees</td><td>$842,120.00</td><td><span class="badge-ok">VERIFIED</span></td><td><span class="pct">100%</span></td></tr>
                    <tr><td>ERP-4093</td><td>Direct Labor GL</td><td>$524,300.00</td><td><span class="badge-ok">VERIFIED</span></td><td><span class="pct">100%</span></td></tr>
                    <tr><td>ERP-4094</td><td>Project WIP Assets</td><td>$1,050,400.00</td><td><span class="badge-ok">VERIFIED</span></td><td><span class="pct">100%</span></td></tr>
                </tbody>
            </table>
        </div>
        """

    elif p["chart_type"] == "workflow_nodes":
        visual_html = f"""
        <div class="chart-container">
            <div class="chart-header">
                <div>
                    <span class="chart-title">{p['chart_title']}</span>
                    <span class="chart-sub">SharePoint Online & Nintex Automated Execution</span>
                </div>
                <span class="status-pill green">● Workflow Engine Active</span>
            </div>
            <div class="pipeline-canvas">
                <div class="pipeline-node">
                    <div class="node-icon">📥</div>
                    <div class="node-title">SharePoint Trigger</div>
                    <div class="node-meta">Raw CSV / ERP Feed</div>
                </div>
                <div class="pipeline-arrow">➔</div>
                <div class="pipeline-node highlight">
                    <div class="node-icon">⚡</div>
                    <div class="node-title">Nintex Workflow</div>
                    <div class="node-meta">Approval & Validation</div>
                </div>
                <div class="pipeline-arrow">➔</div>
                <div class="pipeline-node">
                    <div class="node-icon">📊</div>
                    <div class="node-title">Power BI Dataset</div>
                    <div class="node-meta">Scheduled Gateway</div>
                </div>
                <div class="pipeline-arrow">➔</div>
                <div class="pipeline-node green">
                    <div class="node-icon">✉️</div>
                    <div class="node-title">MIS Distribution</div>
                    <div class="node-meta">Executive Email Alert</div>
                </div>
            </div>
            <div class="pipeline-metrics">
                <div class="p-metric"><span>EXECUTION SPEED</span><strong>2.8s</strong></div>
                <div class="p-metric"><span>ERROR RATE</span><strong>0.00%</strong></div>
                <div class="p-metric"><span>RECURRENCE</span><strong>Hourly Sync</strong></div>
                <div class="p-metric"><span>SECURITY</span><strong>Role-Governed</strong></div>
            </div>
        </div>
        """

    elif p["chart_type"] == "telemetry_pulse":
        visual_html = f"""
        <div class="chart-container">
            <div class="chart-header">
                <div>
                    <span class="chart-title">{p['chart_title']}</span>
                    <span class="chart-sub">Enterprise On-Premises Data Gateway Diagnostics</span>
                </div>
                <span class="status-pill green">● 99.98% Healthy</span>
            </div>
            <div class="pulse-screen">
                <svg viewBox="0 0 760 160" class="pulse-svg">
                    <line x1="0" y1="40" x2="760" y2="40" stroke="rgba(255,255,255,0.05)"/>
                    <line x1="0" y1="80" x2="760" y2="80" stroke="rgba(255,255,255,0.05)"/>
                    <line x1="0" y1="120" x2="760" y2="120" stroke="rgba(255,255,255,0.05)"/>
                    
                    <!-- Pulse Wave -->
                    <path d="M 0,80 L 100,80 L 120,40 L 140,120 L 160,80 L 300,80 L 320,30 L 340,130 L 360,80 L 500,80 L 520,45 L 540,115 L 560,80 L 760,80" fill="none" stroke="{p['accent_light']}" stroke-width="3"/>
                    
                    <!-- Glow Nodes -->
                    <circle cx="330" cy="80" r="6" fill="#10B981" stroke="#FFFFFF" stroke-width="2"/>
                    <circle cx="530" cy="80" r="5" fill="#38BDF8" stroke="#0B0F19" stroke-width="2"/>
                </svg>
            </div>
            <div class="gateway-clusters">
                <div class="cluster-card">
                    <span class="c-name">Gateway Node 01 (Primary)</span>
                    <span class="c-val green">Optimal (42ms)</span>
                </div>
                <div class="cluster-card">
                    <span class="c-name">Gateway Node 02 (Standby)</span>
                    <span class="c-val green">Synced (38ms)</span>
                </div>
                <div class="cluster-card">
                    <span class="c-name">Azure Analysis Services</span>
                    <span class="c-val blue">Connected (12ms)</span>
                </div>
            </div>
        </div>
        """

    elif p["chart_type"] == "database_schema":
        visual_html = f"""
        <div class="chart-container">
            <div class="chart-header">
                <div>
                    <span class="chart-title">{p['chart_title']}</span>
                    <span class="chart-sub">Oracle SQL Temporal Table with Row Versioning</span>
                </div>
                <span class="status-pill blue">● AS OF PERIOD Queries</span>
            </div>
            <div class="sql-code-box">
                <span class="kw">SELECT</span> entity_id, kpi_metric, valid_from, valid_to <br/>
                <span class="kw">FROM</span> temporal_kpi_audit <span class="kw">AS OF PERIOD FOR</span> valid_time (TIMESTAMP '2026-06-01');
            </div>
            <div class="temporal-timeline">
                <div class="time-block v1">
                    <span class="t-badge">v1.0 (Historic)</span>
                    <span class="t-date">2026-01-01 ➔ 2026-04-30</span>
                    <span class="t-metric">Revenue: $1.2M</span>
                </div>
                <div class="time-block v2">
                    <span class="t-badge">v2.0 (Restructured)</span>
                    <span class="t-date">2026-05-01 ➔ 2026-08-31</span>
                    <span class="t-metric">Revenue: $1.8M</span>
                </div>
                <div class="time-block v3">
                    <span class="t-badge">v3.0 (Active State)</span>
                    <span class="t-date">2026-09-01 ➔ CURRENT</span>
                    <span class="t-metric green">Revenue: $2.4M</span>
                </div>
            </div>
        </div>
        """

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }}
  body {{
    width: 1376px;
    height: 768px;
    background: #080C14;
    color: #F8FAFC;
    overflow: hidden;
    padding: 36px 44px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }}
  .grid-bg {{
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 38px 38px;
    pointer-events: none;
  }}
  .glow-1 {{
    position: absolute;
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(56,189,248,0.08) 45%, transparent 70%);
    top: -160px;
    right: -100px;
    pointer-events: none;
  }}
  .glow-2 {{
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 65%);
    bottom: -100px;
    left: -50px;
    pointer-events: none;
  }}

  /* Top Bar */
  .top-bar {{
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 20px;
  }}
  .brand-group {{
    display: flex;
    align-items: center;
    gap: 14px;
  }}
  .window-dots {{
    display: flex;
    gap: 6px;
  }}
  .w-dot {{
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }}
  .dot-red {{ background: #EF4444; }}
  .dot-yellow {{ background: #F59E0B; }}
  .dot-green {{ background: #10B981; }}
  .top-title {{
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }}
  .top-badge {{
    font-size: 11px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #38BDF8;
    background: rgba(56,189,248,0.12);
    border: 1px solid rgba(56,189,248,0.30);
    padding: 6px 14px;
    border-radius: 100px;
  }}

  /* Main Workspace */
  .workspace {{
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 28px;
    height: 560px;
    margin-top: 24px;
  }}

  /* Left KPI Column */
  .kpi-column {{
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: space-between;
  }}
  .kpi-card {{
    background: rgba(17, 24, 39, 0.75);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    padding: 22px 24px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.35);
    backdrop-filter: blur(14px);
  }}
  .kpi-top {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }}
  .kpi-label {{
    font-size: 11px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.12em;
    color: #94A3B8;
    text-transform: uppercase;
  }}
  .kpi-badge {{
    font-size: 11px;
    font-weight: 700;
    color: #10B981;
    background: rgba(16,185,129,0.15);
    padding: 3px 8px;
    border-radius: 6px;
  }}
  .kpi-val {{
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    line-height: 1;
    margin-bottom: 6px;
  }}
  .kpi-sub {{
    font-size: 12px;
    color: #64748B;
  }}

  /* Right Chart Container */
  .chart-container {{
    background: rgba(15, 23, 42, 0.75);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 26px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 12px 30px rgba(0,0,0,0.40);
    backdrop-filter: blur(16px);
  }}
  .chart-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
  }}
  .chart-title {{
    display: block;
    font-size: 18px;
    font-weight: 700;
    color: #F8FAFC;
    letter-spacing: -0.01em;
  }}
  .chart-sub {{
    display: block;
    font-size: 12px;
    color: #94A3B8;
    margin-top: 2px;
  }}
  .chart-legend {{
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #94A3B8;
  }}
  .legend-item {{
    display: flex;
    align-items: center;
    gap: 6px;
  }}
  .dot {{
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }}
  .dot.blue {{ background: #38BDF8; }}
  .dot.green {{ background: #10B981; }}
  .status-pill {{
    font-size: 11px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 100px;
  }}
  .status-pill.green {{
    color: #10B981;
    background: rgba(16,185,129,0.15);
    border: 1px solid rgba(16,185,129,0.30);
  }}
  .status-pill.blue {{
    color: #38BDF8;
    background: rgba(56,189,248,0.15);
    border: 1px solid rgba(56,189,248,0.30);
  }}

  /* Area Bars Layout */
  .chart-body {{
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    justify-content: space-between;
  }}
  .svg-chart {{
    width: 100%;
    height: 250px;
  }}
  .bars-strip {{
    display: flex;
    justify-content: space-between;
    height: 85px;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 10px;
  }}
  .bar-col {{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    width: 80px;
    height: 100%;
  }}
  .bar-fill {{
    width: 22px;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(180deg, #38BDF8 0%, #2563EB 100%);
  }}
  .bar-col span {{
    font-size: 10px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    color: #64748B;
  }}

  /* Rings Grid */
  .rings-grid {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin: 10px 0;
  }}
  .ring-card {{
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }}
  .ring-svg {{
    transform: rotate(-90deg);
  }}
  .ring-val {{
    position: absolute;
    top: 50px;
    font-size: 20px;
    font-weight: 800;
    color: #FFFFFF;
  }}
  .ring-lbl {{
    font-size: 11px;
    font-weight: 600;
    color: #94A3B8;
    margin-top: 10px;
    text-align: center;
  }}
  .bars-horizontal {{
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 10px;
  }}
  .hbar-item {{
    display: grid;
    grid-template-columns: 200px 1fr 50px;
    align-items: center;
    gap: 16px;
    font-size: 12px;
    color: #94A3B8;
  }}
  .hbar-track {{
    height: 10px;
    background: rgba(255,255,255,0.06);
    border-radius: 10px;
    overflow: hidden;
  }}
  .hbar-fill {{
    height: 100%;
    background: linear-gradient(90deg, #2563EB, #38BDF8);
    border-radius: 10px;
  }}
  .hbar-fill.green {{
    background: linear-gradient(90deg, #059669, #10B981);
  }}

  /* SQL Box & Data Table */
  .sql-code-box {{
    background: #050810;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 12px 18px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    line-height: 1.5;
    color: #94A3B8;
    margin-bottom: 14px;
  }}
  .kw {{ color: #38BDF8; font-weight: 700; }}
  .fn {{ color: #F59E0B; }}
  .data-table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }}
  .data-table th {{
    text-align: left;
    padding: 10px 14px;
    color: #64748B;
    font-family: ui-monospace, monospace;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }}
  .data-table td {{
    padding: 14px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    color: #F8FAFC;
  }}
  .badge-ok {{
    background: rgba(16,185,129,0.15);
    color: #10B981;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 10px;
  }}
  .pct {{ color: #38BDF8; font-weight: 700; }}

  /* Pipeline Nodes */
  .pipeline-canvas {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #050810;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 36px 24px;
    margin: 20px 0;
  }}
  .pipeline-node {{
    background: rgba(17,24,39,0.9);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    padding: 16px 18px;
    text-align: center;
    min-width: 140px;
  }}
  .pipeline-node.highlight {{
    border-color: #38BDF8;
    box-shadow: 0 0 16px rgba(56,189,248,0.25);
  }}
  .pipeline-node.green {{
    border-color: #10B981;
    box-shadow: 0 0 16px rgba(16,185,129,0.25);
  }}
  .node-icon {{ font-size: 24px; margin-bottom: 6px; }}
  .node-title {{ font-size: 13px; font-weight: 700; color: #FFFFFF; }}
  .node-meta {{ font-size: 10px; color: #64748B; margin-top: 3px; font-family: ui-monospace, monospace; }}
  .pipeline-arrow {{ font-size: 20px; color: #38BDF8; opacity: 0.7; }}
  .pipeline-metrics {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }}
  .p-metric {{
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }}
  .p-metric span {{ font-size: 10px; color: #64748B; font-family: ui-monospace, monospace; }}
  .p-metric strong {{ font-size: 16px; color: #38BDF8; font-weight: 700; }}

  /* Telemetry Screen */
  .pulse-screen {{
    background: #050810;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 18px 20px;
    margin: 12px 0;
  }}
  .pulse-svg {{
    width: 100%;
    height: 160px;
  }}
  .gateway-clusters {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }}
  .cluster-card {{
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }}
  .c-name {{ font-size: 12px; color: #94A3B8; font-weight: 600; }}
  .c-val.green {{ font-size: 14px; color: #10B981; font-weight: 700; }}
  .c-val.blue {{ font-size: 14px; color: #38BDF8; font-weight: 700; }}

  /* Temporal Timeline */
  .temporal-timeline {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 14px;
  }}
  .time-block {{
    background: rgba(17,24,39,0.85);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }}
  .time-block.v3 {{
    border-color: #38BDF8;
    box-shadow: 0 0 20px rgba(56,189,248,0.20);
  }}
  .t-badge {{ font-size: 11px; font-weight: 700; color: #38BDF8; text-transform: uppercase; }}
  .t-date {{ font-size: 11px; color: #64748B; font-family: ui-monospace, monospace; }}
  .t-metric {{ font-size: 18px; font-weight: 800; color: #FFFFFF; margin-top: 6px; }}
  .t-metric.green {{ color: #10B981; }}
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-1"></div>
  <div class="glow-2"></div>

  <!-- Top Bar -->
  <div class="top-bar">
    <div class="brand-group">
      <div class="window-dots">
        <div class="w-dot dot-red"></div>
        <div class="w-dot dot-yellow"></div>
        <div class="w-dot dot-green"></div>
      </div>
      <span class="top-title">{p['title']}</span>
    </div>
    <span class="top-badge">{p['badge']}</span>
  </div>

  <!-- Workspace -->
  <div class="workspace">
    <div class="kpi-column">
      {kpis_html}
    </div>
    {visual_html}
  </div>
</body>
</html>"""

for p in projects:
    html = generate_html(p)
    tmp_html = f"/tmp/{p['filename']}.html"
    tmp_png = f"/tmp/{p['filename']}.png"
    target_jpg = os.path.join(output_dir, p['filename'])
    
    with open(tmp_html, "w") as f:
        f.write(html)
        
    cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        f"--screenshot={tmp_png}",
        "--window-size=1376,768",
        "--hide-scrollbars",
        tmp_html
    ]
    subprocess.run(cmd, check=True)
    
    # Convert PNG to high-quality JPG at exact 1376x768
    im = Image.open(tmp_png).convert("RGB")
    im.save(target_jpg, "JPEG", quality=95)
    print(f"Generated {target_jpg} ({os.path.getsize(target_jpg)} bytes)")

print("All 6 project images generated successfully!")
