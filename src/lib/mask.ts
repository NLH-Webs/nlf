// Hide donors' names on the public site: keep only initials ("PHAN NGOC MY" -> "P. N. M.").
// Generic labels from the bank and company names (e.g. MoMo's operator) stay as they are.
const KEEP = /^(NGƯỜI ỦNG HỘ ẨN DANH|CUSTOMER|CHUYỂN TIỀN ĐI|NULL)$/i;
const COMPANY = /^(CTCP|CONG TY|CÔNG TY|CTY|TNHH|NGAN HANG|NGÂN HÀNG)\b/i;

export const maskName = (name: string | null | undefined): string => {
  const value = (name || "").trim();
  if (!value || KEEP.test(value) || COMPANY.test(value)) return value;
  return value
    .split(/\s+/)
    .map((word) => `${Array.from(word)[0]?.toUpperCase() ?? ""}.`)
    .join(" ");
};
