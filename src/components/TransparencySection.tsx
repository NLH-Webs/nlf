import { useState, useEffect } from "react";
import { format } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { 
  Calendar,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ShieldCheck,
  ExternalLink
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTranslations, useLanguage } from "@/contexts/language-context";
import { API_ENDPOINTS, BANK_ACCOUNT_ID, STATEMENT_URL } from "@/config/api";
import { maskName } from "@/lib/mask";
import { Transaction, TransactionResponse, TransactionFilters } from "@/types/transaction";

const TransparencySection = () => {
  const { transparency, hero } = useTranslations();
  const { language } = useLanguage();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: '',
    accountName: '',
    bankName: 'MB Bank'
  });

  // Calculate balance if API returns null
  const calculatedBalance = accountBalance !== null ? accountBalance : (totalCredit - totalDebit);
  
  const [filters, setFilters] = useState<TransactionFilters>({
    fromDate: format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    toDate: format(new Date(), 'yyyy-MM-dd'),
    keyword: '',
    pageNumber: 1,
    pageSize: 10,
  });
  
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchTransactions = async () => {
    setLoading(true);
    setFailed(false);
    try {
      const url = API_ENDPOINTS.BANK_TRANSACTIONS(BANK_ACCOUNT_ID, filters);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TransactionResponse = await response.json();
      
      if (data.status === 200) {
        setTransactions(data.data.transactions);
        setAccountBalance(data.data.accountBalance);
        setTotalCredit(data.data.totalCredit);
        setTotalDebit(data.data.totalDebit);
        setHasNextPage(data.data.hasNextPage);
        setCurrentPage(data.data.pageNumber);
        
        // Update account information
        setAccountInfo({
          accountNumber: data.data.accountNumber,
          accountName: data.data.accountName,
          bankName: 'MB Bank' // Default bank name, can be updated if available in API
        });
        
        // Calculate total pages based on hasNextPage
        if (data.data.hasNextPage) {
          setTotalPages(data.data.pageNumber + 1);
        } else {
          setTotalPages(data.data.pageNumber);
        }
        
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setFailed(true);
      
      // Set empty state on error
      setTransactions([]);
      setAccountBalance(null);
      setTotalCredit(0);
      setTotalDebit(0);
      setHasNextPage(false);
      setCurrentPage(1);
      setTotalPages(1);
      setAccountInfo({
        accountNumber: '',
        accountName: '',
        bankName: 'MB Bank'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleDateRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    if (range && range.from && range.to) {
      setDateRange(range);
      setFilters(prev => ({
        ...prev,
        fromDate: format(range.from, 'yyyy-MM-dd'),
        toDate: format(range.to, 'yyyy-MM-dd'),
        pageNumber: 1,
      }));
    }
  };

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      keyword: searchKeyword,
      pageNumber: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      pageNumber: page,
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm', { locale: language === 'vi' ? vi : enUS });
  };

  const getTransactionTypeColor = (type: string) => {
    return type === 'CREDIT'
      ? 'bg-[#F3E6C4] text-slate-900 hover:bg-[#F3E6C4]'
      : 'bg-slate-200 text-slate-900 hover:bg-slate-200';
  };

  const getTransactionTypeText = (type: string) => {
    return type === 'CREDIT' 
      ? (language === 'vi' ? 'Thu' : 'Credit')
      : (language === 'vi' ? 'Chi' : 'Debit');
  };

  return (
    <section id="transparency" className="bg-background py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <span className="nlf-gold-rule mb-4" aria-hidden="true" />
          <h2 className="font-display mb-2 text-2xl font-bold text-slate-900 md:text-4xl">
            {transparency.heading}
          </h2>
          <p className="max-w-3xl text-slate-700">
            {transparency.description}
          </p>
        </div>

        {/* Who holds the fund (SO-CHUAN, chốt 16/11/2026) */}
        <div className="mb-4 max-w-3xl rounded-2xl border border-slate-200 bg-card p-5 text-left md:p-6">
          <h3 className="mb-2 font-semibold text-foreground">{transparency.legalTitle}</h3>
          <p className="text-sm text-slate-700">{transparency.legalBody}</p>
        </div>

        {/* Public statement on thiennguyen.app */}
        <a
          href={STATEMENT_URL}
          data-track="cta"
          data-cta="transparency_statement"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-10 flex max-w-3xl flex-col items-start gap-4 rounded-2xl border-2 border-[color:var(--nlf-gold)] bg-card p-5 text-left transition hover:shadow-md sm:flex-row sm:items-center md:p-6"
        >
          <ShieldCheck className="h-10 w-10 shrink-0 text-[color:var(--nlf-gold)]" aria-hidden="true" />
          <div className="flex-1">
            <div className="font-semibold text-foreground">{transparency.badgeTitle}</div>
            <p className="mt-1 text-sm text-slate-700">{transparency.badgeDescription}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            {transparency.badgeCta}
            <ExternalLink className="h-4 w-4" />
          </span>
        </a>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'vi' ? 'Số dư tài khoản' : 'Account Balance'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-slate-900 md:text-2xl">
                {failed ? hero.unavailable : formatCurrency(calculatedBalance)}
              </div>
              {accountBalance === null && !failed && (
                <div className="text-xs text-muted-foreground mt-1">
                  {language === 'vi' ? '(Tính từ Thu - Chi)' : '(Calculated from Income - Expenses)'}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'vi' ? 'Tổng Thu' : 'Total Income'}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-slate-900 md:text-2xl">
                {failed ? hero.unavailable : formatCurrency(totalCredit)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'vi' ? 'Tổng Chi' : 'Total Expenses'}
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-slate-600" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-slate-900 md:text-2xl">
                {failed ? hero.unavailable : formatCurrency(totalDebit)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'vi' ? 'Tài khoản' : 'Account'}
              </CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-lg font-bold">
                  {accountInfo.accountNumber || BANK_ACCOUNT_ID}
                </div>
                <div className="text-sm text-muted-foreground">
                  {accountInfo.accountName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {accountInfo.bankName}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {language === 'vi' ? 'Bộ lọc giao dịch' : 'Transaction Filters'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {/* Date Range Picker */}
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal sm:w-[300px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd/MM/yyyy", { locale: language === 'vi' ? vi : enUS })} -{" "}
                            {format(dateRange.to, "dd/MM/yyyy", { locale: language === 'vi' ? vi : enUS })}
                          </>
                        ) : (
                          format(dateRange.from, "dd/MM/yyyy", { locale: language === 'vi' ? vi : enUS })
                        )
                      ) : (
                        <span>{language === 'vi' ? 'Chọn khoảng ngày' : 'Pick a date range'}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={handleDateRangeChange}
                      numberOfMonths={typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 2}
                      locale={language === 'vi' ? vi : enUS}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search Input */}
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <Input
                  placeholder={language === 'vi' ? 'Tìm kiếm mã giao dịch hoặc số tài khoản...' : 'Search transaction ID or account number...'}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full sm:w-[300px]"
                />
                <Button onClick={handleSearch} disabled={loading} variant="outline" aria-label={language === 'vi' ? 'Tìm' : 'Search'}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Refresh Button */}
              <Button onClick={fetchTransactions} disabled={loading} variant="outline" aria-label={language === 'vi' ? 'Tải lại' : 'Refresh'}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'vi' ? 'Lịch sử giao dịch' : 'Transaction History'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'vi' ? 'Mã giao dịch' : 'Transaction ID'}</TableHead>
                      <TableHead>{language === 'vi' ? 'Thời gian' : 'Time'}</TableHead>
                      <TableHead>{language === 'vi' ? 'Loại' : 'Type'}</TableHead>
                      <TableHead>{language === 'vi' ? 'Người chuyển/Nhận' : 'Sender/Receiver'}</TableHead>
                      <TableHead>{language === 'vi' ? 'Số tiền' : 'Amount'}</TableHead>
                      <TableHead>{language === 'vi' ? 'Nội dung' : 'Description'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          {failed ? (
                            <>
                              {language === 'vi'
                                ? 'Chưa tải được sao kê lúc này. Bạn xem trực tiếp trên '
                                : "We couldn't load the statement right now. See it directly on "}
                              <a href={STATEMENT_URL} data-track="cta" data-cta="table_error_statement" target="_blank" rel="noopener noreferrer" className="nlf-link">thiennguyen.app</a>
                            </>
                          ) : language === 'vi' ? 'Không có giao dịch nào' : 'No transactions found'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-mono text-sm">
                            {transaction.refId}
                          </TableCell>
                          <TableCell>
                            {formatDate(transaction.transactionTime)}
                          </TableCell>
                          <TableCell>
                            <Badge className={getTransactionTypeColor(transaction.type)}>
                              {getTransactionTypeText(transaction.type)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {maskName(transaction.otherAccountDisplayName)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap font-medium text-slate-900">
                            {transaction.type === 'CREDIT' ? '+' : '−'}{formatCurrency(transaction.transactionAmount)}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {transaction.type === 'CREDIT'
                              ? (language === 'vi' ? 'Ủng hộ quỹ' : 'Donation')
                              : transaction.narrative}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-2 py-4">
                    <div className="text-sm text-muted-foreground">
                      {language === 'vi' 
                        ? `Trang ${currentPage} / ${totalPages}`
                        : `Page ${currentPage} / ${totalPages}`
                      }
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        {language === 'vi' ? 'Trước' : 'Previous'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!hasNextPage}
                      >
                        {language === 'vi' ? 'Tiếp' : 'Next'}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TransparencySection;
