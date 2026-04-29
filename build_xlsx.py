"""
Emergency Fund Calculator — Excel build script.
Generates a single-sheet .xlsx with live formulas, premium formatting,
and a layout matching the client's screenshot (Rent / EMI / Utilities /
Groceries / Other → Emergency corpus + 20% buffer + Live-off-interest
corpus across FD / Debt / Arbitrage).
"""

from openpyxl import Workbook
from openpyxl.styles import (
    Font, PatternFill, Alignment, Border, Side, NamedStyle, Protection
)
from openpyxl.formatting.rule import DataBarRule
from openpyxl.utils import get_column_letter
from openpyxl.workbook.protection import WorkbookProtection

# ===== Palette (premium light theme) =====
INK = "0E1116"           # near-black for primary text
TEXT = "1A1F29"
TEXT_DIM = "4A5365"
TEXT_MUTE = "8B9099"
GOLD = "B8842C"          # champagne gold accent
GOLD_2 = "8A6320"
NAVY = "1E2C52"
BURGUNDY = "862633"
TEAL = "1F6E6A"
GOOD = "1F6E4A"
WARN = "8A6320"
BAD = "862633"
CREAM = "F7F5F0"         # warm cream (background)
CREAM_2 = "FBF9F4"       # off-cream highlight
SURFACE = "FFFFFF"       # surface white
LINE = "E8E3D8"          # warm grey border
LINE_2 = "D8D2C2"

# ===== Typography =====
SERIF = "Cambria"        # Excel-safe serif fallback (Fraunces unavailable)
SANS = "Calibri"

# ===== Helpers =====
thin_line = Side(style="thin", color=LINE)
thin_line_2 = Side(style="thin", color=LINE_2)
medium_line = Side(style="medium", color=INK)
border_all = Border(left=thin_line, right=thin_line, top=thin_line, bottom=thin_line)
border_bottom = Border(bottom=thin_line)
border_top_thick = Border(top=medium_line)

wb = Workbook()
ws = wb.active
ws.title = "Emergency Fund"
ws.sheet_view.showGridLines = False
ws.sheet_view.zoomScale = 110

# ===== Column widths (5 columns: A=label, B=value, C=spacer, D=note, E=value2) =====
widths = {"A": 4, "B": 36, "C": 22, "D": 4, "E": 28, "F": 18, "G": 22}
for col, w in widths.items():
    ws.column_dimensions[col].width = w

# ===== Branded header =====
ws.row_dimensions[1].height = 8
ws.row_dimensions[2].height = 56

# Top accent bar
ws.merge_cells("A1:G1")
ws["A1"].fill = PatternFill("solid", fgColor=INK)

# Title row
ws.merge_cells("B2:G2")
title = ws["B2"]
title.value = "Emergency Fund Calculator"
title.font = Font(name=SERIF, size=28, color=INK, bold=False)
title.alignment = Alignment(vertical="center", horizontal="left", indent=0)
ws["A2"].fill = PatternFill("solid", fgColor=CREAM)

# Subtitle row
ws.row_dimensions[3].height = 22
ws.merge_cells("B3:G3")
sub = ws["B3"]
sub.value = "A premium client tool · Calculate your liquid buffer & passive-income corpus · FY 2025–26"
sub.font = Font(name=SANS, size=11, italic=True, color=TEXT_DIM)
sub.alignment = Alignment(vertical="center", horizontal="left")

# Eyebrow tag row
ws.row_dimensions[4].height = 22
ws["B4"].value = "PRIVATE CLIENT BRIEF · INDIA"
ws["B4"].font = Font(name=SANS, size=8, color=GOLD_2, bold=True)
ws["B4"].alignment = Alignment(vertical="center", horizontal="left")

ws.row_dimensions[5].height = 12
# Subtle divider line under header
for col in "BCDEFG":
    ws[f"{col}5"].border = Border(bottom=thin_line_2)

# ===== Section helper =====
def section_tag(cell, label, color_hex=GOLD_2):
    cell.value = label.upper()
    cell.font = Font(name=SANS, size=8, bold=True, color=color_hex)
    cell.alignment = Alignment(vertical="center", horizontal="left")

def section_title(cell, text):
    cell.value = text
    cell.font = Font(name=SERIF, size=18, color=INK, bold=False)
    cell.alignment = Alignment(vertical="center", horizontal="left")

def field_label(cell, text):
    cell.value = text
    cell.font = Font(name=SANS, size=11, color=TEXT, bold=False)
    cell.alignment = Alignment(vertical="center", horizontal="left")

def hint(cell, text):
    cell.value = text
    cell.font = Font(name=SANS, size=9, color=TEXT_MUTE, italic=True)
    cell.alignment = Alignment(vertical="center", horizontal="left", wrap_text=True)

def input_cell(cell, default_value, fill_color=CREAM_2, locked=False):
    cell.value = default_value
    cell.font = Font(name=SANS, size=12, color=INK, bold=True)
    cell.alignment = Alignment(vertical="center", horizontal="right")
    cell.fill = PatternFill("solid", fgColor=fill_color)
    cell.number_format = '"₹"#,##,##0'
    cell.border = Border(left=thin_line_2, right=thin_line_2, top=thin_line_2, bottom=thin_line_2)
    cell.protection = Protection(locked=locked)

def output_cell(cell, formula, fmt='"₹"#,##,##0', size=12, bold=True, color=INK, fill=None):
    cell.value = formula
    cell.font = Font(name=SANS, size=size, color=color, bold=bold)
    cell.alignment = Alignment(vertical="center", horizontal="right")
    cell.number_format = fmt
    if fill:
        cell.fill = PatternFill("solid", fgColor=fill)
    cell.protection = Protection(locked=True)

# ===== SECTION 01 — INPUTS =====
ws.row_dimensions[6].height = 22
section_tag(ws["B6"], "01 · Your monthly outflow")

ws.row_dimensions[7].height = 30
section_title(ws["B7"], "Enter what leaves your account each month.")

ws.row_dimensions[8].height = 36
ws.merge_cells("B8:G8")
hint(ws["B8"],
     "Be honest. Underestimating here is the most common reason emergency funds fail when they're actually needed. "
     "Round up rather than down. Excludes investments, SIPs, insurance premiums (those go in 'Other').")

# Expense rows: starting row 10
expense_rows = [
    ("Rent",                         "rent",      35000, "Or housing-society maintenance / mortgage interest if you own."),
    ("Total EMI",                    "emi",       45000, "Home loan + car loan + personal loan + credit-card minimum dues."),
    ("Utilities",                    "utilities", 8000,  "Electricity · Gas · Water · Broadband · Mobile · OTT subscriptions."),
    ("Groceries & household",        "groceries", 25000, "Food · cleaning · maid · cook · driver · school fees if monthly."),
    ("Other & miscellaneous",        "other",     15000, "Health insurance premium · transport · entertainment · personal care."),
]

start_row = 10
input_cell_refs = {}

# Header row
ws.row_dimensions[start_row - 1].height = 20
ws[f"B{start_row-1}"].value = "Category"
ws[f"C{start_row-1}"].value = "Monthly amount"
ws[f"E{start_row-1}"].value = "Notes / what to include"
for c in ["B", "C", "E"]:
    ws[f"{c}{start_row-1}"].font = Font(name=SANS, size=9, color=TEXT_MUTE, bold=True)
    ws[f"{c}{start_row-1}"].alignment = Alignment(vertical="center", horizontal="left")
    ws[f"{c}{start_row-1}"].border = Border(bottom=thin_line)

ws.merge_cells(start_row=start_row-1, start_column=5, end_row=start_row-1, end_column=7)

for i, (label, key, default, note) in enumerate(expense_rows):
    r = start_row + i
    ws.row_dimensions[r].height = 32
    field_label(ws[f"B{r}"], label)
    input_cell(ws[f"C{r}"], default)
    ws.merge_cells(start_row=r, start_column=5, end_row=r, end_column=7)
    hint(ws[f"E{r}"], note)
    input_cell_refs[key] = f"C{r}"

# Subtotal row
sub_row = start_row + len(expense_rows) + 1
ws.row_dimensions[sub_row].height = 36
ws[f"B{sub_row}"].value = "Subtotal — raw monthly expenses"
ws[f"B{sub_row}"].font = Font(name=SANS, size=11, color=TEXT_DIM, bold=True)
ws[f"B{sub_row}"].alignment = Alignment(vertical="center", horizontal="left")
ws[f"B{sub_row}"].border = Border(top=thin_line)

# Sum formula
sum_formula = f"=SUM({input_cell_refs['rent']},{input_cell_refs['emi']},{input_cell_refs['utilities']},{input_cell_refs['groceries']},{input_cell_refs['other']})"
output_cell(ws[f"C{sub_row}"], sum_formula, size=12, color=TEXT_DIM)
ws[f"C{sub_row}"].border = Border(top=thin_line)

# ===== Buffer row =====
buf_row = sub_row + 2
ws.row_dimensions[buf_row].height = 30
field_label(ws[f"B{buf_row}"], "Inflation & safety buffer (recommended 20%)")
ws[f"B{buf_row}"].font = Font(name=SANS, size=11, color=TEXT, bold=False, italic=True)

# Buffer input cell (percentage)
buf_cell = ws[f"C{buf_row}"]
buf_cell.value = 0.20
buf_cell.font = Font(name=SANS, size=12, color=INK, bold=True)
buf_cell.alignment = Alignment(vertical="center", horizontal="right")
buf_cell.fill = PatternFill("solid", fgColor=CREAM_2)
buf_cell.number_format = "0%"
buf_cell.border = Border(left=thin_line_2, right=thin_line_2, top=thin_line_2, bottom=thin_line_2)
buf_cell.protection = Protection(locked=False)

ws.merge_cells(start_row=buf_row, start_column=5, end_row=buf_row, end_column=7)
hint(ws[f"E{buf_row}"],
     "20% standard. Set higher (25–40%) if expenses lumpy, lower (10–15%) if your numbers are already padded. Set 0% for raw figures.")

# Adjusted monthly need (the headline)
adj_row = buf_row + 2
ws.row_dimensions[adj_row].height = 50
ws[f"B{adj_row}"].value = "Adjusted monthly need"
ws[f"B{adj_row}"].font = Font(name=SERIF, size=14, color=INK, bold=False)
ws[f"B{adj_row}"].alignment = Alignment(vertical="center", horizontal="left")
ws[f"B{adj_row}"].fill = PatternFill("solid", fgColor=CREAM_2)
ws[f"B{adj_row}"].border = Border(top=medium_line, bottom=medium_line, left=thin_line_2)

adj_formula = f"=C{sub_row}*(1+C{buf_row})"
adj_cell = ws[f"C{adj_row}"]
adj_cell.value = adj_formula
adj_cell.font = Font(name=SERIF, size=20, color=GOLD_2, bold=True)
adj_cell.alignment = Alignment(vertical="center", horizontal="right")
adj_cell.number_format = '"₹"#,##,##0'
adj_cell.fill = PatternFill("solid", fgColor=CREAM_2)
adj_cell.border = Border(top=medium_line, bottom=medium_line, right=thin_line_2)
adj_cell.protection = Protection(locked=True)

# Helper text
ws.merge_cells(start_row=adj_row, start_column=5, end_row=adj_row, end_column=7)
ws[f"E{adj_row}"].value = "= raw subtotal × (1 + buffer%)"
ws[f"E{adj_row}"].font = Font(name=SANS, size=9, color=TEXT_MUTE, italic=True)
ws[f"E{adj_row}"].alignment = Alignment(vertical="center", horizontal="left")
ws[f"E{adj_row}"].fill = PatternFill("solid", fgColor=CREAM_2)
ws[f"E{adj_row}"].border = Border(top=medium_line, bottom=medium_line)

# ===== SECTION 02 — Emergency corpus 3/6/9 months =====
sec2 = adj_row + 3
ws.row_dimensions[sec2].height = 22
section_tag(ws[f"B{sec2}"], "02 · Emergency corpus required")

ws.row_dimensions[sec2 + 1].height = 30
section_title(ws[f"B{sec2 + 1}"], "How much liquid buffer do you need?")

ws.row_dimensions[sec2 + 2].height = 36
ws.merge_cells(start_row=sec2 + 2, start_column=2, end_row=sec2 + 2, end_column=7)
hint(ws[f"B{sec2 + 2}"],
     "Pick the duration that matches your job stability and dependents. This is the lump sum to keep in instant-access form: "
     "savings + sweep-FD + liquid mutual fund.")

# 3/6/9 month rows
duration_data = [
    ("3 months",  3,  TEAL,     "Stable salary · no dependents · short clear runway"),
    ("6 months",  6,  GOLD,     "Most salaried professionals · the standard recommendation"),
    ("9 months",  9,  BURGUNDY, "Self-employed · founder · single-income with dependents"),
]

dur_start = sec2 + 4
ws.row_dimensions[dur_start - 1].height = 22

# Header
ws[f"B{dur_start - 1}"].value = "Duration"
ws[f"C{dur_start - 1}"].value = "Corpus (₹)"
ws[f"E{dur_start - 1}"].value = "Suitable for"
for c in ["B", "C", "E"]:
    ws[f"{c}{dur_start - 1}"].font = Font(name=SANS, size=9, color=TEXT_MUTE, bold=True)
    ws[f"{c}{dur_start - 1}"].alignment = Alignment(vertical="center", horizontal="left" if c != "C" else "right")
    ws[f"{c}{dur_start - 1}"].border = Border(bottom=thin_line)
ws.merge_cells(start_row=dur_start - 1, start_column=5, end_row=dur_start - 1, end_column=7)

for i, (label, months, color_hex, suitable) in enumerate(duration_data):
    r = dur_start + i
    ws.row_dimensions[r].height = 36
    # Label cell with colored left border
    lbl = ws[f"B{r}"]
    lbl.value = label
    lbl.font = Font(name=SERIF, size=14, color=INK, bold=False)
    lbl.alignment = Alignment(vertical="center", horizontal="left")
    lbl.border = Border(left=Side(style="thick", color=color_hex), bottom=thin_line)

    # Formula
    formula = f"=C{adj_row}*{months}"
    out = ws[f"C{r}"]
    out.value = formula
    out.font = Font(name=SANS, size=14, color=color_hex, bold=True)
    out.alignment = Alignment(vertical="center", horizontal="right")
    out.number_format = '"₹"#,##,##0'
    out.border = Border(bottom=thin_line)
    out.protection = Protection(locked=True)

    ws.merge_cells(start_row=r, start_column=5, end_row=r, end_column=7)
    note = ws[f"E{r}"]
    note.value = suitable
    note.font = Font(name=SANS, size=10, color=TEXT_DIM, italic=True)
    note.alignment = Alignment(vertical="center", horizontal="left", wrap_text=True)
    note.border = Border(bottom=thin_line)

# Data bars on the corpus column
dbar_range = f"C{dur_start}:C{dur_start + len(duration_data) - 1}"
data_bar_rule = DataBarRule(
    start_type='min',
    end_type='max',
    color=GOLD.replace("#", ""),
    showValue=True,
)
ws.conditional_formatting.add(dbar_range, data_bar_rule)

# ===== SECTION 03 — Live-off-interest corpus =====
sec3 = dur_start + len(duration_data) + 2
ws.row_dimensions[sec3].height = 22
section_tag(ws[f"B{sec3}"], "03 · Live-off-interest corpus")

ws.row_dimensions[sec3 + 1].height = 30
section_title(ws[f"B{sec3 + 1}"], "Principal needed to fund these expenses indefinitely.")

ws.row_dimensions[sec3 + 2].height = 50
ws.merge_cells(start_row=sec3 + 2, start_column=2, end_row=sec3 + 2, end_column=7)
hint(ws[f"B{sec3 + 2}"],
     "If your monthly outflow is funded entirely from interest income — never touching principal — here is the corpus required across "
     "three popular instruments. Tax assumption is your slab rate, which you can edit below.")

# Slab input
slab_row = sec3 + 4
ws.row_dimensions[slab_row].height = 30
field_label(ws[f"B{slab_row}"], "Your income tax slab (highest applicable)")

slab_cell = ws[f"C{slab_row}"]
slab_cell.value = 0.30
slab_cell.font = Font(name=SANS, size=12, color=INK, bold=True)
slab_cell.alignment = Alignment(vertical="center", horizontal="right")
slab_cell.fill = PatternFill("solid", fgColor=CREAM_2)
slab_cell.number_format = "0%"
slab_cell.border = Border(left=thin_line_2, right=thin_line_2, top=thin_line_2, bottom=thin_line_2)
slab_cell.protection = Protection(locked=False)

ws.merge_cells(start_row=slab_row, start_column=5, end_row=slab_row, end_column=7)
hint(ws[f"E{slab_row}"], "Common: 5% / 10% / 15% / 20% / 30%. New regime slabs differ slightly. Use your highest applicable slab.")

# Annual need helper
annual_row = slab_row + 1
ws.row_dimensions[annual_row].height = 28
ws[f"B{annual_row}"].value = "Annual outflow (= adjusted monthly × 12)"
ws[f"B{annual_row}"].font = Font(name=SANS, size=10, color=TEXT_MUTE, italic=True)
ws[f"B{annual_row}"].alignment = Alignment(vertical="center", horizontal="left")
output_cell(ws[f"C{annual_row}"], f"=C{adj_row}*12", size=11, color=TEXT_DIM, bold=False)

# Instrument table header
inst_hdr = annual_row + 2
ws.row_dimensions[inst_hdr].height = 26
headers = [
    ("B", "Instrument"),
    ("C", "Pre-tax yield"),
    ("D", ""),
    ("E", "Post-tax yield"),
    ("F", "Annual need"),
    ("G", "Corpus required"),
]
for col, txt in headers:
    cell = ws[f"{col}{inst_hdr}"]
    cell.value = txt
    cell.font = Font(name=SANS, size=9, color=TEXT_MUTE, bold=True)
    cell.alignment = Alignment(vertical="center", horizontal="left" if col == "B" else "right")
    cell.border = Border(bottom=thin_line, top=thin_line)
    cell.fill = PatternFill("solid", fgColor=CREAM_2)

# Instrument rows
# Each row: name, desc, pre-tax yield, tax treatment formula
instruments = [
    {
        "name": "Bank Fixed Deposit",
        "desc": "Sovereign-backed up to ₹5L (DICGC). Interest fully taxed at slab.",
        "pretax": 0.07,
        # Post-tax = pretax × (1 - slab)
        "post_formula": lambda slab: f"=0.07*(1-{slab})",
        "color": NAVY,
    },
    {
        "name": "Debt Mutual Fund",
        "desc": "Liquid / short-duration. Post Apr-2023 — fully slab-taxed.",
        "pretax": 0.07,
        "post_formula": lambda slab: f"=0.07*(1-{slab})",
        "color": GOLD_2,
    },
    {
        "name": "Arbitrage Fund (Recommended)",
        "desc": "Equity-taxed: 12.5% LTCG above ₹1.25L. Best post-tax for high slabs.",
        "pretax": 0.065,
        "post_formula": lambda slab: f"=0.065*(1-0.125)",
        "color": GOOD,
    },
]

inst_start = inst_hdr + 1
for i, ins in enumerate(instruments):
    r1 = inst_start + i * 2  # main row
    r2 = r1 + 1               # description row

    ws.row_dimensions[r1].height = 26
    ws.row_dimensions[r2].height = 24

    # Name
    n = ws[f"B{r1}"]
    n.value = ins["name"]
    n.font = Font(name=SERIF, size=13, color=ins["color"], bold=False)
    n.alignment = Alignment(vertical="center", horizontal="left")

    # Pre-tax yield
    pre = ws[f"C{r1}"]
    pre.value = ins["pretax"]
    pre.font = Font(name=SANS, size=11, color=TEXT, bold=True)
    pre.alignment = Alignment(vertical="center", horizontal="right")
    pre.number_format = "0.00%"

    # Post-tax yield
    post = ws[f"E{r1}"]
    post.value = ins["post_formula"](f"C{slab_row}")
    post.font = Font(name=SANS, size=11, color=TEXT, bold=True)
    post.alignment = Alignment(vertical="center", horizontal="right")
    post.number_format = "0.00%"
    post.protection = Protection(locked=True)

    # Annual need = same across all = C(annual_row)
    an = ws[f"F{r1}"]
    an.value = f"=C{annual_row}"
    an.font = Font(name=SANS, size=11, color=TEXT_DIM)
    an.alignment = Alignment(vertical="center", horizontal="right")
    an.number_format = '"₹"#,##,##0'
    an.protection = Protection(locked=True)

    # Corpus = annual / post-tax yield
    corp = ws[f"G{r1}"]
    corp.value = f"=IFERROR(F{r1}/E{r1},0)"
    corp.font = Font(name=SANS, size=14, color=ins["color"], bold=True)
    corp.alignment = Alignment(vertical="center", horizontal="right")
    corp.number_format = '"₹"#,##,##0'
    corp.protection = Protection(locked=True)

    # Description row spanning across
    ws.merge_cells(start_row=r2, start_column=2, end_row=r2, end_column=7)
    d = ws[f"B{r2}"]
    d.value = ins["desc"]
    d.font = Font(name=SANS, size=9, color=TEXT_MUTE, italic=True)
    d.alignment = Alignment(vertical="top", horizontal="left", wrap_text=True)
    d.border = Border(bottom=thin_line)

# Highlight recommended (last instrument)
rec_row = inst_start + (len(instruments) - 1) * 2
for col in "BCDEFG":
    cell = ws[f"{col}{rec_row}"]
    cell.fill = PatternFill("solid", fgColor="EAF4EF")
ws[f"B{rec_row + 1}"].fill = PatternFill("solid", fgColor="EAF4EF")

# ===== SECTION 04 — Methodology =====
sec4 = inst_start + len(instruments) * 2 + 2
ws.row_dimensions[sec4].height = 22
section_tag(ws[f"B{sec4}"], "Methodology & assumptions")

method_lines = [
    "• Monthly need = (Rent + EMI + Utilities + Groceries + Other) × (1 + buffer%)",
    "• 3 / 6 / 9-month corpus = monthly need × N — held in instant-access form (savings + sweep-FD + liquid fund)",
    "• Live-off-interest corpus = annual need ÷ post-tax yield — principal untouched, interest withdrawn",
    "• FD post-tax = 7.0% × (1 − slab%). Indicative; varies by bank, tenor, senior-citizen premium",
    "• Debt fund post-tax = 7.0% × (1 − slab%). Post Finance Act 2023 — no LTCG benefit regardless of holding",
    "• Arbitrage post-tax = 6.5% × (1 − 12.5%) for the LTCG-eligible portion (held > 12 months)",
    "• Yields are illustrative for FY 2025–26. Confirm current rates with your relationship manager",
    "• Cells with light cream background are inputs (editable). All others are computed.",
]
for i, line in enumerate(method_lines):
    r = sec4 + 1 + i
    ws.row_dimensions[r].height = 20
    ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=7)
    cell = ws[f"B{r}"]
    cell.value = line
    cell.font = Font(name=SANS, size=10, color=TEXT_DIM)
    cell.alignment = Alignment(vertical="center", horizontal="left", wrap_text=True)

# Disclaimer
disc_row = sec4 + 1 + len(method_lines) + 2
ws.row_dimensions[disc_row].height = 50
ws.merge_cells(start_row=disc_row, start_column=2, end_row=disc_row, end_column=7)
disc = ws[f"B{disc_row}"]
disc.value = ("Disclaimer — This calculator is an educational synthesis. It is not investment, tax, or legal advice. "
              "Yields and tax rules change; verify with your CA and banker before acting. © 2026 Private Client Brief.")
disc.font = Font(name=SANS, size=9, color=TEXT_MUTE, italic=True)
disc.alignment = Alignment(vertical="center", horizontal="left", wrap_text=True)
disc.fill = PatternFill("solid", fgColor=CREAM_2)
disc.border = Border(left=Side(style="thick", color=GOLD), top=thin_line, bottom=thin_line, right=thin_line)

# ===== Workbook protection (allow editing only inputs) =====
# Protect sheet — locked cells can't be edited; unlocked input cells can.
ws.protection.sheet = True
ws.protection.password = ""  # no password — easy to unprotect if needed
ws.protection.formatCells = False
ws.protection.formatColumns = False
ws.protection.formatRows = False
ws.protection.selectLockedCells = True
ws.protection.selectUnlockedCells = True

# ===== Print setup =====
ws.print_options.horizontalCentered = True
ws.page_setup.orientation = ws.ORIENTATION_PORTRAIT
ws.page_setup.fitToPage = True
ws.page_setup.fitToWidth = 1
ws.page_setup.fitToHeight = 0
ws.page_margins.left = 0.4
ws.page_margins.right = 0.4
ws.page_margins.top = 0.4
ws.page_margins.bottom = 0.4

# Save
out = "/home/user/Ril-Map/Emergency_Fund_Calculator.xlsx"
wb.save(out)
print(f"✓ Saved: {out}")
print(f"  Inputs: rent, emi, utilities, groceries, other (cells C10–C14)")
print(f"  Buffer: cell C{buf_row} (default 20%)")
print(f"  Slab:   cell C{slab_row} (default 30%)")
print(f"  Adjusted monthly need: C{adj_row}")
print(f"  3 / 6 / 9-month corpus: C{dur_start}–C{dur_start + 2}")
