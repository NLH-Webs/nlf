const API_BASE_URL = import.meta.env.DEV ? '' : '/api';

export const API_ENDPOINTS = {
  BANK_TRANSACTIONS: (bankAccountId: string, params: {
    fromDate: string;
    toDate: string;
    keyword?: string;
    pageNumber: number;
    pageSize: number;
  }) => {
    const searchParams = new URLSearchParams({
      fromDate: params.fromDate,
      toDate: params.toDate,
      keyword: params.keyword || '',
      pageNumber: params.pageNumber.toString(),
      pageSize: params.pageSize.toString(),
    });
    
    const baseUrl = import.meta.env.DEV
      ? `/api/v2/bank-account-transaction/${bankAccountId}/transactionsV2`
      : `${API_BASE_URL}/v2/bank-account-transaction/${bankAccountId}/transactionsV2`;
    
    return `${baseUrl}?${searchParams.toString()}`;
  }
};

export const BANK_ACCOUNT_ID = '8711';
// One donation destination for the whole site: the fund's public page on Thiện Nguyện.
export const DONATE_URL = 'https://thiennguyen.app/user/nhilefoundation';
// Official public statement link (sent by chị Nhi 16/11/2026).
// Links to other NhiLe sites carry where the visitor came from.
export const NLH_URL = 'https://nlh.vn/?utm_source=nlf.sg&utm_medium=web&utm_campaign=ecosystem';
// mailto with a subject that says which site and which button it came from.
export const mailto = (cta: string) =>
  `mailto:nhilefoundation.sg@gmail.com?subject=${encodeURIComponent(`[nlf.sg] ${cta}`)}`;
export const STATEMENT_URL = 'https://thiennguyen.app/user/nhilefoundation?tab=TRANSACTIONS';
